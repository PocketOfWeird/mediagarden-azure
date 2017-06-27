// KitPost/index.js
const token = require('../shared/auth/token')
const graph = require('../shared/graph')
const action_types = require('../shared/helpers/action_types')
const Kit = require('../shared/models/Kit')
const authenticated = require('../shared/auth')
const { sendData, sendError } = require('../shared/helpers')

module.exports = function (context, req) {
  token.verify(req)
  .then(user => {
    if (authenticated(user).allowedTo('POST', 'kits')) {
      const action = req.body
      if (action.type === action_types.KIT_POST) {
        var data = action.payload
        data.kit.partition_key = data.kit.name
        data.kit.uploaded_by = user.id
        data.kit.last_updated_by = user.id

        Kit.validate(data)
        .then(kit => {
          const kitProps = kit.kit
          const equipmentObjects = kit.equipment
          const categoryIds = kit.categories

          var jobs = []
          jobs.push({ type: 'addVertex', label: 'kit', data: kitProps })
          for (var i in equipmentObjects) {
            jobs.push({ type: 'addEdge', label: 'inKit', data: {from: kitProps.id, to: equipmentObjects[i].id, props: {qyt: equipmentObjects[i].qyt}}})
          }
          for (var i in categoryIds) {
            jobs.push({ type: 'addEdge', label: 'inCategory', data: {from: categoryIds[i], to: kitProps.id}})
          }
          graph.batch(jobs, (error, results) => {
            if (!error) {
              sendData(kit, context, 201)
            } else {
              sendError(error, context)
            }
          })
        })
        .catch(error => sendError(error, context, 400))
      } else {
        sendError('Invalid action for Kit Post', context, 400)
      }
    } else {
      sendError('Invalid permissions for Kit Post', context, 403)
    }
  })
  .catch(error => sendError(error, context, 401))
}
