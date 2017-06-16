// ScriptMakeSample/index.js
const cloudconvert = new (require('cloudconvert'))(process.env.cloudconvert_key)
const action_types = require('../shared/helpers/action_types')
const Script = require('../shared/models/Script')
const { allowedToPostScripts } = require('../shared/helpers/checkers')
const { sendErrorToClient } = require('../shared/helpers')


module.exports = (context, action) => {
  if (action.type === action_types.SERVER_SCRIPT_POST) {
    if (allowedToPostScripts(action)) {
      var data = action.payload

      Script.validate(data)
      .then(script => {

        if (action.meta.updateDocumentOnly) {
          context.log('Bypassing reindexing and script sample creation')
          action.payload = script
          context.bindings.scriptUpdateQueueOut = [action]
          context.done()
        } else if (action.meta.skipSampleCreation) {
          context.log('Bypassing script sample creation')
          action.payload = script
          context.bindings.scriptReIndexQueueOut = [action]
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
              context.bindings.scriptReIndexQueueOut = [action]
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
      sendErrorToClient('Invalid permissions for Script Post Queue', context, action)
    }
  } else {
    sendErrorToClient('Invalid action for Script Post Queue', context, action)
  }
}
/*

*/
