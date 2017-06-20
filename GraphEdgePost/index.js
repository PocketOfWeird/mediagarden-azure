// GraphEdgePost/index.js
const token = require('../shared/auth/token')
const graph = require('../shared/graph')
const action_types = require('../shared/helpers/action_types')
const graphModels = require('../shared/models/graphModels')
const EdgePostPayload = require('../shared/models/EdgePostPayload')
const { sanitizeLiberally } = require('../shared/helpers/sanitizers')
const { sendData, sendError } = require('../shared/helpers')


module.exports = function (context, req) {
  token.verify(req)
  .then(user => {
    const resource1 = sanitizeLiberally(req.params.resource1)
    const resource2 = sanitizeLiberally(req.params.resource2)
    const Relationship = graphModels.relationships[resource1][resource2]
    if (Relationship) {
      var data = req.body.payload

      EdgePostPayload.validate(data)
      .then(ids => {
        graph.addEdge(Relationship, ids)
        .then(results => sendData(results, context, 201))
        .catch(error => sendError(error, context))
      })
      .catch(error => sendError(error, context, 400))
    } else {
      sendError('Relationship not found', context, 404)
    }
  })
  .catch(error => sendError(error, context, 401))
}
