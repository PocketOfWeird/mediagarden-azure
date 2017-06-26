// ContactGetId/index.js
const token = require('../shared/auth/token')
const graph = require('../shared/graph')
const action_types = require('../shared/helpers/action_types')
const Contact = require('../shared/models/Contact')
const authenticated = require('../shared/auth')
const isUUID = require('validator/lib/isUUID')
const { sendData, sendError, removeProps } = require('../shared/helpers')
const getContactId = require('../shared/auth/getContactId')


const _getContantInfo = (id, context) => {
  var jobs = []
  jobs.push({ type: 'getV', data: id })
  jobs.push({ type: 'getInE', data: id })
  jobs.push({ type: 'getInEoutV', data: id })
  jobs.push({ type: 'getOutE', data: id })
  jobs.push({ type: 'getOutEinV', data: id })
  graph.batch(jobs, (error, results) => {
    if (!error) {
      sendData(results, context)
    } else {
      sendError(error, context)
    }
  })
}

module.exports = function (context, req) {
  token.verify(req)
  .then(user => {
    const id = String(req.params.id)
    if (id === '_me') {
      if (authenticated(user).allowedTo('GET_ME', 'contacts')) {
        getContactId(user.id, (error, id) => {
          if (!error) {
            _getContantInfo(id, context)
          } else {
            sendError(error, context)
          }
        })
      } else {
        sendError('Invalid permissions for Contact Get me', context, 403)
      }
    } else if (isUUID(id)) {

      if (authenticated(user).allowedTo('GET_ID', 'contacts')) {
        _getContantInfo(id, context)
      } else {
        sendError('Invalid permissions for Contact Get Id', context, 403)
      }
    } else {
      sendError('Invalid id for Contact Get Id', context, 400)
    }
  })
  .catch(error => sendError(error, context, 401))
}
