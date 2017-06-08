// ScriptBlobPostHandler/index.js
const https = require('https')
const { sendDataToClient, sendErrorToClient } = require('../shared/helpers')


module.exports = (context, scriptBlob) => {

  const options = {
    hostname: process.env.azureSearchHostname,
    path: '/indexers/script?api-version=2016-09-01',
    method: 'PUT',
    headers: {
      'Content-Type':'application/json'
    }
  };

  const searchReq = https.request(options, (searchRes) => {
    if (searchRes.statusCode === 204 || searchRes.statusCode === 201) {
      context.log(scriptBlob)
      //sendDataToClient(scriptBlob.metadata, context)
    } else {
      sendErrorToClient('Error running index', context)
    }
  })

  searchReq.on('error', e => {
    sendErrorToClient(e, context)
  })

  searchReq.write('{ "api-key": "' + process.env.azureSearchKey + '" }')

  searchReq.end()
}
