// GraphVertexPost/index.js
const token = require('../shared/auth/token')
const graph = require('../shared/graph')
const action_types = require('../shared/helpers/action_types')
const graphModels = require('../shared/models/graphModels')
const Equipment = require('../shared/models/Equipment')
const { sanitizeLiberally } = require('../shared/helpers/sanitizers')
const { current } = require('../shared/helpers/checkers')
const { sendData, sendError } = require('../shared/helpers')

module.exports = function (context, req) {
  token.verify(req)
  .then(user => {
    if (current(user).allowedTo('POST', 'equipment')) {
      var data = req.body.payload
      data.equipment.partition_key = data.equipment.manufacturer
      data.equipment.uploaded_by = user.id,
      data.equipment.last_updated_by = user.id


      Equipment.validate(data)
      .then(equipment => {
        const equipmentProps = equipment.equipment
        const barcodeIds = equipment.barcodes
        const categoryIds = equipment.categories

        var jobs = []
        jobs.push(graph.addVertex('equipment', equipmentProps))
        for (var i in barcodeIds) {
          jobs.push(graph.addEdge('hasBarcode', {id1: equipmentProps.id, id2: barcodeIds[i], props: {status: 'Checked-In'}}))
        }
        for (var i in categoryIds) {
          jobs.push(graph.addEdge('inCategory', {id1: categoryIds[i], id2: equipmentProps.id}))
        }
        graph.batch(jobs)
        .then(results => sendData(equipment, context, 201))
        .catch(error => sendError(error, context))
      })
      .catch(error => sendError(error, context, 400))
    } else {
      sendError('Invalid permissions for Equipment post', context, 403)
    }
  })
  .catch(error => sendError(error, context, 401))
}
