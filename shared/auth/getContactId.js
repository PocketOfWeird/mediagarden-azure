const graph = require('../graph')


module.exports = (username, callback) => {
  const job = { type: 'has', data: {key: 'username', value: username }}

  graph.single(job, (error, result) => {
      if (!error) {
        if (result.length > 0 && result[0].id) {
          callback(null, result[0].id)
        } else {
          callback('No contact found')
        }
      } else {
        callback(error)
      }
    })
}
