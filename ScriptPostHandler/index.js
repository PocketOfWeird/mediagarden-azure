// ScriptPostHandler/index.js
const cloudconvert = new (require('cloudconvert'))(process.env.cloudconvert_key)
const { SERVER_SCRIPT_POST } = require('../shared/action_types')
const Script = require('../shared/models/Script')
const { sendErrorToClient } = require('../shared/helpers')


module.exports = (context, action) => {
  if (action.type === SERVER_SCRIPT_POST) {
    var data = action.payload

    Script.validate(data)
    .then(script => {

      if (action.meta.bypassSampleCreation) {
        context.log('Bypassing script sample creation')
        action.payload = script
        context.bindings.scriptUpdateQueueOut = [action]
        context.done()
      } else {
        const sample_filename = script.filename.slice(0, -4) + '-sample.pdf'
        context.log('Calling cloudconvert')
        cloudconvert.convert({
          "inputformat": "pdf",
          "outputformat": "pdf",
          "input": {
              "azureblob": {
                  "storageaccount": process.env.clientblobs_account,
                  "storageaccesskey": process.env.clientblobs_key,
                  "container": "script"
              }
          },
          "file": script.filename,
          "converteroptions": {
              "page_range": "1-3"
          },
          "output": {
              "azureblob": {
                  "storageaccount": process.env.clientblobs_account,
                  "storageaccesskey": process.env.clientblobs_key,
                  "container": "script-sample",
                  "path": sample_filename
              }
          }
        }, (error) => {
          if (!error) {
            context.log('cloudconvert completed')
            script.sample_filename = sample_filename
            script.sample_url = process.env.azure_clientblobs_url + 'script-sample/' + encodeURI(sample_filename)
            action.payload = script
            context.bindings.scriptUpdateQueueOut = [action]
            context.done()
          } else {
            context.log('cloudconvert failed: ' + error)
            sendErrorToClient(error, context, action)
          }
        })
      }
    })
    .catch(error => sendErrorToClient(error, context, action))
  } else {
    sendErrorToClient('Invalid action for Script Post Queue', context, action)
  }
}
/*

*/
