// ScriptReIndex/index.js
const token = require('../shared/auth/token')
const { postIt } = require('../shared/helpers/fetchers')
const action_types = require('../shared/helpers/action_types')
const Script = require('../shared/models/Script')
const { current } = require('../shared/helpers/checkers')
const { sendData, sendError } = require('../shared/helpers')


module.exports = (context, req) => {
  token.verify(req)
  .then(user => {
    const action = req.body
    if (action.type === action_types.SERVER_SCRIPT_POST) {
      if (current(user).allowedTo('INDEX', 'scripts', action.payload)) {
        var data = action.payload
        data.last_updated_by = user.id

        Script.validate(data)
        .then(script => {

          const url = 'https://' + process.env.azureSearchHostname + '/indexers/script/run?api-version=2016-09-01'

          postIt(url, process.env.azureSearchKey)
          .then(response => {
            if (response.ok) {
              sendData(script, context)
            } else {
              sendError(response.statusText, context, response.status)
            }
          })
          .catch(error => sendError(error, context))
        })
        .catch(error => sendError(error, context, 400))
      } else {
        sendError('Invalid permissions for Script Index Put', context, 403)
      }
    } else {
      sendError('Invalid action for Script Index', context, 400)
    }
  })
  .catch(error => sendError(error, context, 401))
}
