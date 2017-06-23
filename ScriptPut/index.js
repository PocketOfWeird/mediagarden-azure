// ScriptPut/index.js
const token = require('../shared/auth/token')
const action_types = require('../shared/helpers/action_types')
const Script = require('../shared/models/Script')
const { postIt } = require('../shared/helpers/fetchers')
const authenticated = require('../shared/auth')
const { sendData, sendError } = require('../shared/helpers')


module.exports = (context, req) => {
  token.verify(req)
  .then(user => {
    const action = req.body
    if (action.type === action_types.SCRIPT_PUT) {
      if (authenticated(user).allowedTo('PUT', 'scripts', action.payload)) {
        var data = action.payload
        data.last_updated_by = user.id

        Script.validate(data)
        .then(script => {

          script['@search.action'] = 'mergeOrUpload'
          const data = { "value": [script] }

          const url = 'https://' + process.env.azureSearchHostname + '/indexes/script/docs/index?api-version=2016-09-01'

          postIt(url, process.env.azureSearchKey, data)
          .then(res => res.json())
          .then(response => {
            if (response.ok) {
              delete script['@search.action']
              sendData(script, context)
            } else {
              sendError(response.statusText, context, response.status)
            }
          })
          .catch(error => sendError(error, context))
        })
        .catch(error => sendError(error, context, 400))
      } else {
        sendError('Invalid permissions for Script Put', context, 403)
      }
    } else {
      sendError('Invalid action for Script Put', context, 400)
    }
  })
  .catch(error => sendError(error, context, 401))
}
