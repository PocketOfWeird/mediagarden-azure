// SoundQuery/index.js
const token = require('../shared/auth/token')
const authenticated = require('../shared/auth')
const { postIt } = require('../shared/helpers/fetchers')
const action_types = require('../shared/helpers/action_types')
const AzureSearchQuery = require('../shared/models/AzureSearchQuery')
const { sendData, sendError } = require('../shared/helpers')


module.exports = (context, req) => {
  token.verify(req)
  .then(user => {
    if (authenticated(user).allowedTo('QUERY', 'sounds')) {
      const action = req.body
      if (action.type === action_types.SOUND_QUERY) {
        AzureSearchQuery.validate(action.payload)
        .then(query => {
          const url = 'https://' + process.env.azureSearchHostname + '/indexes/sound/docs/search?api-version=2016-09-01'

          postIt(url, process.env.azureSearchQueryKey, query)
          .then(res => res.json())
          .then(response => {
            if (response.ok) {
              sendData(response, context)
            } else {
              sendError(response.statusText, context, response.status)
            }
          })
          .catch(error => sendError(error, context))
        })
        .catch(error => sendError(error, context, 400))
      } else {
        sendErrorToClient('Invalid action for Sound Query', context, 400)
      }
    } else {
      sendError('Invalid permissions for Sound Query Post', context, 403)
    }
  })
  .catch(error => sendError(error, context, 401))
}
