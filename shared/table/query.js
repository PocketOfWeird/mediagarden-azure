// shared/table/query.js
const azure = require('azure-storage')
const table = require('./index')

const builder = new azure.TableQuery(process.env.mediagarden0intertables)

const entities = (tables, query, callback, results) => {
  if (tables.length === 0) {
    callback(null, results)
  } else {
    if (!results) results = []
    table.queryEntities(tables[0], query, null, (error, result) => {
      if (!error) {
        results.push(result)
        entities(tables.slice(1), query, callback, results)
      } else {
        callback(error)
      }
    })
  }
}

module.exports = {
  builder,
  entities
}
