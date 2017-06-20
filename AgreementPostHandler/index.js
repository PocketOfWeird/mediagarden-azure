// AgreementPostHandler/index.js
const azure = require('azure-storage')
const action_types = require('../shared/helpers/action_types')
const Agreement = require('../shared/models/Agreement')
const { sendDataToClient, sendErrorToClient } = require('../shared/helpers')

module.exports = (context, action) => {
  if (action.type === action_types.SERVER_AGREEMENT_POST) {
    var data = action.payload
    data.PartitionKey = data.type
    data.uploaded_by = data.uploaded_by ? data.uploaded_by : action.meta.user.user
    data.last_updated_by = action.meta.user.user

    Agreement.validate(data)
    .then(agreement => {
      azure.createTableService(process.env.mediagarden0intertables).insertOrReplaceEntity('Agreement', agreement, (error, result, response) => {
        if (!error) {
          if (result) agreement.etag = result['.metadata'].etag
          sendDataToClient(agreement, context, action)
        } else {
          sendErrorToClient(error, context, action)
        }
      })
    })
    .catch(error => sendErrorToClient(error, context, action))
  } else {
    sendErrorToClient('Invalid action for Agreement Post Queue', context, action)
  }
}
