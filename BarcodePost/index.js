// BarcodePost/index.js
const token = require('../shared/auth/token')
const graph = require('../shared/graph')
const action_types = require('../shared/helpers/action_types')
const Barcode = require('../shared/models/Barcode')
const authenticated = require('../shared/auth')
const isUUID = require('validator/lib/isUUID')
const { sendData, sendError } = require('../shared/helpers')

module.exports = function (context, req) {
  token.verify(req)
  .then(user => {
    if (authenticated(user).allowedTo('POST', 'barcodes')) {
      const action = req.body
      if (action.type === action_types.BARCODE_POST) {
        var dataArray = []
        for (var i in action.payload.barcodes) {
          var data = action.payload.barcodes[i]
          data.partition_key = data.location
          data.uploaded_by = user.id,
          data.last_updated_by = user.id
          dataArray.push(data)
        }


        Barcode.validate({ barcodes: dataArray })
        .then(barcode => {
          var jobs = []
          for (var i in barcode.barcodes) {
            jobs.push({ type: 'addVertex', label: 'barcode', data: barcode.barcodes[i] })
            if (req.query.equipmentId) {
              var equipmentId = req.query.equipmentId
              if (isUUID(equipmentId, 4)) {
                jobs.push({ type: 'addEdge', label: 'hasBarcode', data: {from: equipmentId, to: barcode.barcodes[i].id, props: {status:'Checked-In'}}})
              }
            }
          }
          graph.batch(jobs, (error, results) => {
            if (!error) {
              sendData(barcode, context, 201)
            } else {
              sendError(error, context)
            }
          })
        })
        .catch(error => sendError(error, context, 400))
      } else {
        sendError('Invalid action for Barcode Post', context, 400)
      }
    } else {
      sendError('Invalid permissions for Barcode Post', context, 403)
    }
  })
  .catch(error => sendError(error, context, 401))
}
