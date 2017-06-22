const client = require('./client')
const statements =  require('./statements')

const _execute = statement => new Promise((resolve, reject) => {
  client.execute(statement, {}, (error, results) => {
    if (!error) {
      resolve(results)
    } else {
      reject(error)
    }
  })
})

const _statement = type => (label, data) => {
  const statement = statements.generate(type, label, data)
  return _execute(statement)
}

module.exports = {
  addVertex: _statement(statements.TYPES.addVertex),
  addEdge: _statement(statements.TYPES.addEdge),
  batch: Jobs => Jobs.reduce((jobs, job) => jobs.then(job), Promise.resolve())
}
