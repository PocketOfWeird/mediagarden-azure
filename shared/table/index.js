// shared/table/index.js
const azure = require('azure-storage')


module.exports = azure.createTableService(process.env.mediagarden0intertables)
