// ContactPost/index.js
const graph = require('../shared/graph')
const action_types = require('../shared/helpers/action_types')
const Contact = require('../shared/models/Contact')
const { sendDataToClient, sendErrorToClient } = require('../shared/helpers')

module.exports = function (context, req) {
  context.res.headers = { 'Content-Type': 'application/json' }
  var data = req.body.payload
  data.partition_key = data.username

  Contact.validate(data)
  .then(contact => {

    graph.execute("g.addV('contact').property('id', id).property('partition_key', partition_key).property('username', username).property('name', name)", contact, (err, results) => {
      if (!err) {
        context.res.body = { data: results }
        //sendDataToClient(contact, context, action)
      } else {
        context.res.body = { error: err.message }
      }
      context.done()
    })
  })
  .catch(error => sendErrorToClient(error, context, action))
}
