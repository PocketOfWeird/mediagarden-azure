// ContactPost/index.js
const token = require('../shared/auth/token')
const graph = require('../shared/graph')
const action_types = require('../shared/helpers/action_types')
const Contact = require('../shared/models/Contact')
const authenticated = require('../shared/auth')
const { sendData, sendError } = require('../shared/helpers')

module.exports = function (context, req) {
  token.verify(req)
  .then(user => {
    if (authenticated(user).allowedTo('POST', 'contacts', req.body.payload)) {
      const action = req.body
      if (action.type === action_types.CONTACT_POST) {
        var data = action.payload
        if (authenticated(user).isFacStaffAdmin()) {
          data.username = data.username || user.id
          data.name = data.name || user.name
          data.email =  data.email || user.email
        } else {
          data.username = user.id
          data.name = user.name
          data.email = user.email
        }
        data.partition_key = data.username
        data.uploaded_by = user.id
        data.last_updated_by = user.id


        Contact.validate(data)
        .then(contact => {
          const job = { type: 'addVertex', label: 'contact', data: contact }
          graph.single(job, (error, result) => {
            if (!error) {
              sendData(contact, context, 201)
            } else {
              sendError(error, context)
            }
          })
        })
        .catch(error => sendError(error, context, 400))
      } else {
        sendError('Invalid action for Contact Post', context, 400)
      }
    } else {
      sendError('Invalid permissions for Contact Post', context, 403)
    }
  })
  .catch(error => sendError(error, context, 401))
}
