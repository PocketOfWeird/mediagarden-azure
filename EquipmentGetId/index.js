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
        var jobs = []
        jobs.push({ type: 'getV', data: id })
        if (authenticated(user).isLabWorker()) {
          jobs.push({ type: 'getOutE', data: id })
          jobs.push({ type: 'getOutEinV', data: id })
        }
        graph.batch(jobs, (error, results) => {
          if (!error) {
            sendData(results, context)
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
