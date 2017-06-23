// HourGet/index.js
const token = require('../shared/auth/token')
const authenticated = require('../shared/auth')
const table = require('../shared/table')
const query = require('../shared/table/query')
const { currentSemester } = require('../shared/helpers/dates')
const { sendData, sendError } = require('../shared/helpers')



module.exports = (context, req) => {
  token.verify(req)
  .then(user => {
    if (authenticated(user).allowedTo('GET', 'hours')) {

      const q = query.builder.where('PartitionKey eq ?', currentSemester())
      const tables = ['Hour', 'Special']
      query.entities(tables, q, (error, results) => {
        if (!error) {
          sendData(results, context)
        } else {
          sendError(error, context)
        }
      })
    } else {
      sendError('Invalid permissions for Hour Post', context, 403)
    }
  })
  .catch(error => sendError(error, context, 401))
}
