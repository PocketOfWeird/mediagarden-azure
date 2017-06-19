const client = require('./client')
const gremlins =  require('./gremlins')

const _baseCall = (type, label, data) => new Promise((resolve, reject) => {

  const statement = gremlins.generateStatement(type, label, data)

  client.execute(statement, { }, (err, results) => {
    if (!err) {
      resolve(results)
    } else {
      reject(err)
    }
  })
})

const addVertex = (label, data) => _baseCall('addV', label, data)

const addEdge = (relationship, ids) => _baseCall('addE', relationship, ids)

module.exports = {
  addVertex,
  addEdge,
}
