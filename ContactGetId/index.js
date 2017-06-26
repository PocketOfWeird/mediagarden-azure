// ContactGetId/index.js
const token = require('../shared/auth/token')
const graph = require('../shared/graph')
const action_types = require('../shared/helpers/action_types')
const Contact = require('../shared/models/Contact')
const authenticated = require('../shared/auth')
const isUUID = require('validator/lib/isUUID')
const { sendData, sendError, removeProps } = require('../shared/helpers')

module.exports = function (context, req) {
  token.verify(req)
  .then(user => {
    const id = String(req.params.id)
    var jobs = []
    var allowed = false
    if (id === '_me') {
      allowed = authenticated(user).allowedTo('GET_ME', 'contacts')
      jobs.push({ type: 'has', data: {key: 'username', value: user.id}})
    } else if (isUUID(id)) {
      allowed = authenticated(user).allowedTo('GET_ID', 'contacts')
      jobs.push({ type: 'getV', data: id })
      jobs.push({ type: 'getInE', data: id })
    } else {
      sendError('Invalid id for Contact Get Id', context, 400)
    }
    if (allowed) {
      graph.batch(jobs, (error, results) => {
        if (!error) {
          sendData(results, context)
        } else {
          sendError(error, context)
        }
      })
    } else {
      sendError('Invalid permissions for Contact Get Id', context, 403)
    }
  })
  .catch(error => sendError(error, context, 401))
}
