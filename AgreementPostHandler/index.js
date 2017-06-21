// AgreementPostHandler/index.js
const token = require('../shared/auth/token')
const action_types = require('../shared/helpers/action_types')
const Agreement = require('../shared/models/Agreement')
const { current } = require('../shared/helpers/checkers')
const { sendData, sendError } = require('../shared/helpers')


module.exports = (context, req) => {
  token.verify(req)
  .then(user => {
    if (current(user).allowedTo('POST', 'agreements')) {
      const action = req.body
      if (action.type === action_types.SERVER_AGREEMENT_POST) {
        var data = action.payload
        data.PartitionKey = data.type
        data.uploaded_by = data.uploaded_by ? data.uploaded_by : user.id
        data.last_updated_by = user.id

        Agreement.validate(data)
        .then(agreement => {
          context.bindings.outTable = agreement
          sendData(agreement, context, 201)
        })
        .catch(error => sendError(error, context, 400))
      } else {
        sendError('Invalid action for Agreement Post', context, 400)
      }
    } else {
      sendError('Invalid permissions for Agreement Post', context, 403)
    }
  })
  .catch(error => sendError(error, context, 401))
}
