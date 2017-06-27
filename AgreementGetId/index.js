// AgreemenGetId/index.js
const token = require('../shared/auth/token')
const authenticated = require('../shared/auth')
const { sanitizeLiberally } = require('../shared/helpers/sanitizers')
const types = require('../shared/models/types')
const isNumeric = require('validator/lib/isNumeric')
const table = require('../shared/table')
const { sendData, sendError } = require('../shared/helpers')


module.exports = (context, req) => {
  token.verify(req)
  .then(user => {
    if (authenticated(user).allowedTo('GET_ID', 'agreements')) {
      const type = sanitizeLiberally(req.params.type)
      if (types.agreements.includes(type)) {
        const id = String(req.params.id)
        if (isNumeric(id)) {

          table.retrieveEntity('Agreement', type, id, (error, result) => {
            if (!error) {
              sendData(result, context)
            } else {
              sendError(error, context)
            }
          })
        } else {
          sendError('Invalid id for Agreement Get Id')
        }
      } else {
        sendError('Invalid type for Agreement Get Id', context, 400)
      }
    } else {
      sendError('Invalid permissions for Agreement Get Id', context, 403)
    }
  })
  .catch(error => sendError(error, context, 401))
}
