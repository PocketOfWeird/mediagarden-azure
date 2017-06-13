// ClientQueueHandler/index.js
const jwt = require('jsonwebtoken')
const User = require('../shared/models/User')
const action_types = require('../shared/helpers/action_types')
const { checkRoles } = require('../shared/helpers/checkers')
const { sendErrorToClient } = require('../shared/helpers')


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
              case action_types.SERVER_AGREEMENT_POST:
                outToQueue('agreementPost', 'fasta', action, context)
                break
              case action_types.SERVER_SCRIPT_POST:
                outToQueue('scriptPost', 'all', action, context)
                break
              case action_types.SERVER_SCRIPT_QUERY:
                outToQueue('scriptQuery', 'all', action, context)
                break
              case action_types.SERVER_SOUND_POST:
                outToQueue('soundPost', 'fasta', action, context)
                break
              case action_types.SERVER_SOUND_QUERY:
                outToQueue('soundQuery', 'all', action, context)
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
