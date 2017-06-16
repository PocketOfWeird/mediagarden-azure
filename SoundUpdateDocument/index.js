// SoundUpdateDocument/index.js
const action_types = require('../shared/helpers/action_types')
const Sound = require('../shared/models/Sound')
const { postIt } = require('../shared/helpers/fetchers')
const { sendDataToClient, sendErrorToClient } = require('../shared/helpers')


module.exports = (context, action) => {
  if (action.type === action_types.SERVER_SOUND_POST) {
    var data = action.payload
    data.uploaded_by = data.uploaded_by ? data.uploaded_by : action.meta.user.user
    data.last_updated_by = action.meta.user.user

    Sound.validate(data)
    .then(sound => {

      sound['@search.action'] = 'mergeOrUpload'
      const data = { "value": [sound] }

      const url = 'https://' + process.env.azureSearchHostname + '/indexes/sound/docs/index?api-version=2016-09-01'

      postIt(url, process.env.azureSearchKey, data)
      .then(response => {
        if (response.ok) {
          delete sound['@search.action']
          sendDataToClient(sound, context, action)
        } else {
          sendErrorToClient(response.status + ': ' + response.statusText, context, action)
        }
      })
      .catch(error => sendErrorToClient(error, context, action))
    })
    .catch(error => sendErrorToClient(error, context, action))
  } else {
    sendErrorToClient('Invalid action for Sound Post Queue', context, action)
  }
}
