// AgreementPost/index.js
const token = require('../shared/auth/token')
const action_types = require('../shared/helpers/action_types')
const { sanitizeLiberally } = require('../shared/helpers/sanitizers')
const types = require('../shared/models/types')
const Agreement = require('../shared/models/Agreement')
const authenticated = require('../shared/auth')
const { sendData, sendError } = require('../shared/helpers')


module.exports = (context, req) => {
  token.verify(req)
  .then(user => {
    if (authenticated(user).allowedTo('POST', 'agreements')) {
      const action = req.body
      if (action.type === action_types.AGREEMENT_POST) {
        const agreement_type = sanitizeLiberally(req.params.type)
        if (types.agreements.includes(agreement_type)) {
          var data = action.payload
          data.PartitionKey = agreement_type
          data.type = agreement_type
          data.uploaded_by = data.uploaded_by || user.id
          data.last_updated_by = user.id

          Agreement.validate(data)
          .then(agreement => {
            agreement.id = agreement.RowKey
            context.bindings.outTable = agreement
            sendData(agreement, context, 201)
          })
          .catch(error => sendError(error, context, 400))
        } else {
          sendError('Invalid type for Agreement Post', context, 400)
        }
      } else {
        sendError('Invalid action for Agreement Post', context, 400)
      }
    } else {
      sendError('Invalid permissions for Agreement Post', context, 403)
    }
  })
  .catch(error => sendError(error, context, 401))
}
