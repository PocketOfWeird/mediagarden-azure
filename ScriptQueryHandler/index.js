// ScriptQueryHandler/index.js
const { postIt } = require('../shared/helpers/fetchers')
const action_types = require('../shared/helpers/action_types')
const AzureSearchQuery = require('../shared/models/AzureSearchQuery')
const { sendDataToClient, sendErrorToClient } = require('../shared/helpers')


module.exports = (context, action) => {
    if (action.type === action_types.SERVER_SCRIPT_QUERY) {

      AzureSearchQuery.validate(action.payload)
      .then(query => {
        const url = 'https://' + process.env.azureSearchHostname + '/indexes/script/docs/search?api-version=2016-09-01'

        postIt(url, process.env.azureSearchQueryKey, query)
        .then(res => res.json())
        .then(response => {
          if (!response.error) {
            sendDataToClient(response, context, action)
          } else {
            sendErrorToClient(response.error, context, action)
          }
        })
        .catch(error => sendErrorToClient(error, context, action))
      })
      .catch(error => sendErrorToClient(error, context, action))
    } else {
      sendErrorToClient('Invalid action for Script Query Queue', context, action)
    }
}
