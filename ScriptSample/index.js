// ScriptSample/index.js
const token = require('../shared/auth/token')
const cloudconvert = new (require('cloudconvert'))(process.env.cloudconvert_key)
const action_types = require('../shared/helpers/action_types')
const Script = require('../shared/models/Script')
const authenticated = require('../shared/auth')
const { sendData, sendError } = require('../shared/helpers')


module.exports = (context, req) => {
  token.verify(req)
  .then(user => {
    const action = req.body
    if (action.type === action_types.SCRIPT_SAMPLE) {
      if (authenticated(user).allowedToPost('SAMPLE', 'scripts', action.payload)) {
        var data = action.payload
        data.last_updated_by = user.id

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
                script.sample_filename = sample_filename
                script.sample_url = process.env.azure_clientblobs_url + 'script-sample/' + encodeURI(sample_filename)
                sendData(script, context, 201)
              } else {
                sendError(error, context)
              }
            })
          }
        })
        .catch(error => sendError(error, context))
      } else {
        sendError('Invalid permissions for Script Sample Put', context, 403)
      }
    } else {
      sendError('Invalid action for Script Sample Put', context, 400)
    }
  })
  .catch(error => sendError(error, context, 401))
}
