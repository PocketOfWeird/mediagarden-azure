// ScriptReIndex/index.js
const { postIt } = require('../shared/helpers/fetchers')
const action_types = require('../shared/helpers/action_types')
const Script = require('../shared/models/Script')
const { allowedToPostScripts } = require('../shared/helpers/checkers')
const { sendDataToClient, sendErrorToClient } = require('../shared/helpers')


module.exports = (context, action) => {
  if (action.type === action_types.SERVER_SCRIPT_POST) {
    if (allowedToPostScripts(action)) {
      var data = action.payload

      Script.validate(data)
      .then(script => {

        const url = 'https://' + process.env.azureSearchHostname + '/indexers/script/run?api-version=2016-09-01'

        postIt(url, process.env.azureSearchKey)
        .then(response => {
          if (response.ok) {
            action.payload = script
            context.bindings.scriptUpdateQueueOut = [action]
            context.done()
          } else {
            sendErrorToClient(response.status + ': ' + response.statusText, context, action)
          }
        })
        .catch(error => sendErrorToClient(error, context, action))
      })
      .catch(error => sendErrorToClient(error, context, action))
    } else {
      sendErrorToClient('Invalid permissions for Script ReIndex Queue', context, action)
    }
  } else {
    sendErrorToClient('Invalid action for Script ReIndex Queue', context, action)
  }
}
