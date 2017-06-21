// SoundUpdateDocument/index.js
const token = require('../shared/auth/token')
const action_types = require('../shared/helpers/action_types')
const { current } = require('../shared/helpers/checkers')
const Sound = require('../shared/models/Sound')
const { postIt } = require('../shared/helpers/fetchers')
const { sendData, sendError } = require('../shared/helpers')


module.exports = (context, action) => {
  token.verify(req)
  .then(user => {
    if (current(user).allowedTo('POST', 'sounds')) {
      const action = req.body
      if (action.type === action_types.SERVER_SOUND_POST) {
        var data = action.payload
        data.uploaded_by = data.uploaded_by ? data.uploaded_by : user.id
        data.last_updated_by = user.id

        Sound.validate(data)
        .then(sound => {

          sound['@search.action'] = 'mergeOrUpload'
          const data = { "value": [sound] }

          const url = 'https://' + process.env.azureSearchHostname + '/indexes/sound/docs/index?api-version=2016-09-01'

          postIt(url, process.env.azureSearchKey, data)
          .then(response => {
            if (response.ok) {
              delete sound['@search.action']
              sendData(sound, context)
            } else {
              sendError(response.statusText, context, response.status)
            }
          })
          .catch(error => sendError(error, context))
        })
        .catch(error => sendError(error, context, 400))
      } else {
        sendError('Invalid action for Sound Post', context, 400)
      }
    } else {
      sendError('Invalid permissions for Sound Post', context, 403)
    }
  })
  .catch(error => sendError(error, context, 401))
}
