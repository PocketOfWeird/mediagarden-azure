// shared/graph/gremlin.js
const Gremlin = require('gremlin-secure')

module.exports = Gremlin.createClient(443, process.env.graph_endpoint,
  {
      session: false,
      ssl: true,
      user: '/dbs/' + process.env.graph_database + '/colls/' + process.env.graph_collection,
      password: process.env.graph_primaryKey
  }
)
