// ScriptUpdateDocument/index.js
const action_types = require('../shared/helpers/action_types')
const Script = require('../shared/models/Script')
const { postIt } = require('../shared/helpers/fetchers')
const { allowedToPostScripts } = require('../shared/helpers/checkers')
const { sendDataToClient, sendErrorToClient } = require('../shared/helpers')


module.exports = (context, action) => {
  if (action.type === action_types.SERVER_SCRIPT_POST) {
    if (allowedToPostScripts(action)) {
      var data = action.payload
      data.last_updated_by = action.meta.user.user

      Script.validate(data)
      .then(script => {

        script['@search.action'] = 'mergeOrUpload'
        const data = { "value": [script] }

        const url = 'https://' + process.env.azureSearchHostname + '/indexes/script/docs/index?api-version=2016-09-01'

        postIt(url, process.env.azureSearchKey, data)
        .then(res => res.json())
        .then(response => {
          if (!response.error) {
            delete script['@search.action']
            sendDataToClient(script, context, action)
          } else {
            sendErrorToClient(response.error, context, action)
          }
        })
        .catch(error => sendErrorToClient(error, context, action))
      })
      .catch(error => sendErrorToClient(error, context, action))
    } else {
      sendErrorToClient('Invalid permissions for Script Update Queue', context, action)
    }
  } else {
    sendErrorToClient('Invalid action for Script Update Queue', context, action)
  }
}
