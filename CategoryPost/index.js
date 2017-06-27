// CategoryPost/index.js
const token = require('../shared/auth/token')
const graph = require('../shared/graph')
const action_types = require('../shared/helpers/action_types')
const Category = require('../shared/models/Category')
const authenticated = require('../shared/auth')
const { sendData, sendError } = require('../shared/helpers')

module.exports = function (context, req) {
  token.verify(req)
  .then(user => {
    if (authenticated(user).allowedTo('POST', 'categories')) {
      const action = req.body
      if (action.type === action_types.CATEGORY_POST) {
        var data = action.payload
        data.partition_key = data.name
        data.uploaded_by = user.id,
        data.last_updated_by = user.id


        Category.validate(data)
        .then(category => {
          const jobs = []
          jobs.push({ type: 'addVertex', label: 'category', data: category })
          if (category.parent) {
            jobs.push({ type: 'addEdge', label: 'subCategory', data: { from: category.parent, to: category.id, props: {active: true}}})
          }
          graph.batch(jobs, (error, results) => {
            if (!error) {
              sendData(category, context, 201)
            } else {
              sendError(error, context)
            }
          })
        })
        .catch(error => sendError(error, context, 400))
      } else {
        sendError('Invalid action for Category Post', context, 400)
      }
    } else {
      sendError('Invalid permissions for Category Post', context, 403)
    }
  })
  .catch(error => sendError(error, context, 401))
}
