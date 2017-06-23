const client = require('./client')
const statements =  require('./statements')

const single = (job, callback) => {
  const statement = statements.generate(job.type, job.label, job.data)

  client.execute(statement, {}, (error, result) => {
    if (!error) {
      callback(null, result)
    } else {
      callback(error)
    }
  })
}

const batch = (jobs, callback, results) => {
  if (jobs.length === 0) {
    callback(null, results)
  } else {
    if (!results) results = []

    var statement = statements.generate(jobs[0].type, jobs[0].label, jobs[0].data)

    client.execute(statement, {}, (error, result) => {
      if (!error) {
        results.push(result)
        _batch(jobs.slice(1), callback, results)
      } else {
        callback(error)
      }
    })
  }
}

module.exports = {
  single,
  batch,
}
