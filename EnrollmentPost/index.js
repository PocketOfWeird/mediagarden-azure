// EnrollmentPost/index.js
const token = require('../shared/auth/token')
const action_types = require('../shared/helpers/action_types')
const Enrollment = require('../shared/models/Enrollment')
const authenticated = require('../shared/auth')
const { sendData, sendError } = require('../shared/helpers')


module.exports = (context, req) => {
  token.verify(req)
  .then(user => {
    if (authenticated(user).allowedTo('POST', 'enrollments')) {
      const action = req.body
      if (action.type === action_types.ENROLLMENT_POST) {
        var data = action.payload
        data.PartitionKey = data.course
        data.uploaded_by = user.id
        data.last_updated_by = user.id
        if (process.env.NODE_ENV === 'development') {
          data.contact = data.contact || user.id
        } else {
          data.contact = user.id
        }

        Enrollment.validate(data)
        .then(enrollment => {
          enrollment.id = enrollment.RowKey
          context.bindings.outTable = enrollment
          context.bindings.outQueue = enrollment
          sendData(enrollment, context, 201)
        })
        .catch(error => sendError(error, context, 400))
      } else {
        sendError('Invalid action for Enrollment Post', context, 400)
      }
    } else {
      sendError('Invalid permissions for Enrollment Post', context, 403)
    }
  })
  .catch(error => sendError(error, context, 401))
}
