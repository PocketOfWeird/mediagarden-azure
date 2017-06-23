// EquipmentPost/index.js
const token = require('../shared/auth/token')
const graph = require('../shared/graph')
const action_types = require('../shared/helpers/action_types')
const Equipment = require('../shared/models/Equipment')
const authenticated = require('../shared/auth')
const { sendData, sendError } = require('../shared/helpers')

module.exports = function (context, req) {
  token.verify(req)
  .then(user => {
    if (authenticated(user).allowedTo('POST', 'equipment')) {
      const action = req.body
      if (action.type === action_types.EQUIPMENT_POST) {
        var data = action.payload
        data.equipment.partition_key = data.equipment.manufacturer
        data.equipment.uploaded_by = user.id,
        data.equipment.last_updated_by = user.id


        Equipment.validate(data)
        .then(equipment => {
          const equipmentProps = equipment.equipment
          const barcodeIds = equipment.barcodes
          const categoryIds = equipment.categories

          var jobs = []
          jobs.push({ type: 'addVertex', label: 'equipment', data: equipmentProps })
          for (var i in barcodeIds) {
            jobs.push({ type: 'addEdge', label: 'hasBarcode', data: {from: equipmentProps.id, to: barcodeIds[i], props: {status: 'Checked-In'}}})
          }
          for (var i in categoryIds) {
            jobs.push({ type: 'addEdge', label: 'inCategory', data: {from: categoryIds[i], to: equipmentProps.id}})
          }
          graph.batch(jobs, (error, results) => {
            if (!error) {
              sendData(equipment, context, 201)
            } else {
              sendError(error, context)
            }
          })
        })
        .catch(error => sendError(error, context, 400))
      } else {
        sendError('Invalid action for Equipment Post', context, 400)
      }
    } else {
      sendError('Invalid permissions for Equipment post', context, 403)
    }
  })
  .catch(error => sendError(error, context, 401))
}
