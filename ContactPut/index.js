// ContactPut/index.js
const token = require('../shared/auth/token')
const graph = require('../shared/graph')
const action_types = require('../shared/helpers/action_types')
const Contact = require('../shared/models/Contact')
const authenticated = require('../shared/auth')
const isUUID = require('validator/lib/isUUID')
const { sendData, sendError, removeProps } = require('../shared/helpers')

module.exports = function (context, req) {
  token.verify(req)
  .then(user => {
    if (authenticated(user).allowedTo('PUT', 'contacts', req.body.payload)) {
      const action = req.body
      if (action.type === action_types.CONTACT_PUT) {
        var data = action.payload
        if (isUUID(req.params.id)) {
          data.id = data.id || req.params.id
        }
        data.last_updated_by = user.id
        if (data.id) {
          Contact.validate(data)
          .then(contact => {
            var contactProps = removeProps(['id', 'partition_key', 'username']).from(contact)
            const job = { type: 'modifyVertexProps', data: { id: contact.id, props: contactProps }}
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
          sendError('Invalid id for Contact Put', contact, 400)
        }
      } else {
        sendError('Invalid action for Contact Put', context, 400)
      }
    } else {
      sendError('Invalid permissions for Contact Put', context, 403)
    }
  })
  .catch(error => sendError(error, context, 401))
}
