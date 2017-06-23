// AgreementPostHandler/index.js
const token = require('../shared/auth/token')
const authenticated = require('../shared/auth')
const { sanitizeLiberally } = require('../shared/helpers/sanitizers')
const types = require('../shared/models/types')
const table = require('../shared/table')
const query = require('../shared/table/query')
const { sendData, sendError } = require('../shared/helpers')


module.exports = (context, req) => {
  token.verify(req)
  .then(user => {
    if (authenticated(user).allowedTo('GET', 'agreements')) {
      const type = sanitizeLiberally(req.params.type)
      if (types.agreements.includes(type)) {

        const q = query.where('PartitionKey eq ?', type)
        table.queryEntities('Agreement', q, null, (error, result) => {
          if (!error) {
            sendData(result, context)
          } else {
            sendError(error, context)
          }
        })
      } else {
        sendError('Invalid type for Agreement Get', context, 400)
      }
      const q = query.top(1).
    } else {
      sendError('Invalid permissions for Agreement Get', context, 403)
    }
  })
  .catch(error => sendError(error, context, 401))
}
