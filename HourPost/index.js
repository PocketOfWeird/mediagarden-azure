// HourPost/index.js
const token = require('../shared/auth/token')
const action_types = require('../shared/helpers/action_types')
const Hour = require('../shared/models/Hour')
const authenticated = require('../shared/auth')
const { currentSemester } = require('../shared/helpers/dates')
const { sendData, sendError } = require('../shared/helpers')


module.exports = (context, req) => {
  token.verify(req)
  .then(user => {
    if (authenticated(user).allowedTo('POST', 'hours')) {
      const action = req.body
      if (action.type === action_types.HOUR_POST) {
        var data = action.payload
        data.hour.PartitionKey = currentSemester()
        data.hour.uploaded_by = data.hour.uploaded_by || user.id
        data.hour.last_updated_by = user.id

        Hour.validate(data)
        .then(hour => {
          context.bindings.outTableHour = hour.hour
          context.bindings.outTableSpecial = []
          for (var i in hour.special) {
            var specialDate = hour.special[i]
            specialDate.PartitionKey = currentSemester()
            specialDate.uploaded_by = specialDate.uploaded_by || user.id
            specialDate.last_updated_by = user.id
            context.bindings.outTableSpecial.push(specialDate)
          }
          sendData(hour, context, 201)
        })
        .catch(error => sendError(error, context, 400))
      } else {
        sendError('Invalid action for Hour Post', context, 400)
      }
    } else {
      sendError('Invalid permissions for Hour Post', context, 403)
    }
  })
  .catch(error => sendError(error, context, 401))
}
