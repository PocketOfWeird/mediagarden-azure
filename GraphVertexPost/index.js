// GraphVertexPost/index.js
const token = require('../shared/auth/token')
const graph = require('../shared/graph')
const action_types = require('../shared/helpers/action_types')
const graphModels = require('../shared/models/graphModels')
const { sanitizeLiberally } = require('../shared/helpers/sanitizers')
const { current } = require('../shared/helpers/checkers')
const { sendData, sendError } = require('../shared/helpers')

module.exports = function (context, req) {
  token.verify(req)
  .then(user => {
    const resource = sanitizeLiberally(req.params.resource)
    if (current(user).allowedTo('POST', resource)) {
      const modelInfo = graphModels.resources[resource]
      if (modelInfo) {
        const Model = modelInfo[0]
        const Label = modelInfo[1]
        const PartitionKeyProp = modelInfo[2]
        var data = req.body.payload
        data.partition_key = data[PartitionKeyProp]

        Model.validate(data)
        .then(model => {
          graph.addVertex(Label, model)
          .then(results => sendData(results, context, 201))
          .catch(error => sendError(error, context))
        })
        .catch(error => sendError(error, context, 400))
      } else {
        sendError('Resource not found', context, 404)
      }
    } else {
      sendError('Invalid permissions for ' + resource + ' post', context, 403)
    }
  })
  .catch(error => sendError(error, context, 401))
}
