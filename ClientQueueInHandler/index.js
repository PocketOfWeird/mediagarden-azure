const jwt = require('jsonwebtoken')
const { checkRoles, errorAction } = require('../shared/helpers')


const sendErrorToClient = (message, context) => {
  context.bindings.clientStateOut = [errorAction(message)]
  context.done()
}

const outToQueue = (queue, roleGroup, action, context) => checkRoles(action, roleGroup,
  () => sendErrorToClient('Insufficient permissions', context),
  () => {
    context.bindings[queue + 'QueueOut'] = [action]
    context.done()
  }
)

module.exports = (context, action) => {
    if (action.type && action.payload && action.meta) {
      jwt.verify(action.meta.token, process.env['temp_client_key_secret'], (err, user) => {
        if (!err) {

          action.meta.user = user

          switch (action.type) {
            case 'SERVER_SCRIPT_POST':
              outToQueue('scriptPost', 'fasta', action, context)
              break
            case 'SERVER_AGREEMENT_POST':
              outToQueue('agreementPost', 'fasta', action, context)
              break
            default:
              sendErrorToClient('Invalid action type', context)
              break
          }
        } else {
          sendErrorToClient('Invalid token', context)
        }
      })
    } else {
      sendErrorToClient('Invalid action', context)
    }
}
