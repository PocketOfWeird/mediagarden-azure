// ClientQueueHandler/index.js
const jwt = require('jsonwebtoken')
const User = require('../shared/models/User')
const { SERVER_AGREEMENT_POST } = require('../shared/action_types')
const { checkRoles, sendErrorToClient } = require('../shared/helpers')


const outToQueue = (queue, roleGroup, action, context) => checkRoles(action, roleGroup,
  () => sendErrorToClient('Insufficient permissions', context, action),
  () => {
    context.bindings[queue + 'QueueOut'] = [action]
    context.done()
  }
)

module.exports = (context, action) => {
    if (action.type && action.payload && action.meta) {
      jwt.verify(action.meta.token, process.env['temp_client_key_secret'], (err, user) => {
        if (!err) {

          User.validate(user)
          .then(validatedUser => {
            action.meta.user = validatedUser

            switch (action.type) {
              case SERVER_AGREEMENT_POST:
                outToQueue('agreementPost', 'fasta', action, context)
                break
              default:
                sendErrorToClient('Invalid action type', context, action)
                break
            }
          })
          .catch(error => sendErrorToClient(error, context, action))
        } else {
          sendErrorToClient('Invalid token', context, action)
        }
      })
    } else {
      sendErrorToClient('Invalid action', context, action)
    }
}
