// ScriptUpdateDocument/index.js
const fetch = require('node-fetch')
const { SERVER_SCRIPT_POST } = require('../shared/action_types')
const Script = require('../shared/models/Script')
const { sendDataToClient, sendErrorToClient } = require('../shared/helpers')


module.exports = (context, action) => {
  if (action.type === SERVER_SCRIPT_POST) {
    var data = action.payload

    Script.validate(data)
    .then(script => {

      script['@search.action'] = 'mergeOrUpload'
      const body = JSON.stringify({ "value": [script] })

      const url = 'https://' + process.env.azureSearchHostname + '/indexes/script/docs/index?api-version=2016-09-01'

      const options = {
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
          'api-key': process.env.azureSearchKey
        },
        body
      }

      fetch(url, options)
      .then(res => res.json())
      .then(response => {
        if (!response.error) {
          context.log('success?', response)
          delete script['@search.action']
          sendDataToClient(script, context, action)
        } else {
          context.log('error?', response)
          sendErrorToClient(response.error, context, action)
        }
      })
      .catch(error => sendErrorToClient(error, context, action))
    })
    .catch(error => sendErrorToClient(error, context, action))
  } else {
    sendErrorToClient('Invalid action for Script Post Queue', context, action)
  }
}
