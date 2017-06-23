// EquipmentGetId/index.js
const token = require('../shared/auth/token')
const graph = require('../shared/graph')
const authenticated = require('../shared/auth')
const isUUID = require('validator/lib/isUUID')
const { sendData, sendError } = require('../shared/helpers')

module.exports = function (context, req) {
  token.verify(req)
  .then(user => {
    if (authenticated(user).allowedTo('GET_ID', 'equipment')) {
      const id = String(req.params.id)
      if (isUUID(id, 4)) {
        if (authenticated(user).isLabWorker()) {
          const job = { type: 'getFullEquipment', data: id }
        } else {
          const job = { type: 'getV', data: id }
        }
        graph.single(job, (error, result) => {
          if (!error) {
            sendData(result, context)
          } else {
            sendError(error, context)
          }
        })
      } else {
        sendError('Invalid id for Equipment Get Id', context, 400)
      }
    } else {
      sendError('Invalid permissions for Equipment Get Id', context, 403)
    }
  })
  .catch(error => sendError(error, context, 401))
}
