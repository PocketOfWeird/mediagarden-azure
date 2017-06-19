// shared/models/Role.js
const modeler = require('./modeler')


const Role = modeler.model({
  id: { type: 'uuid', creator: 'uuid', required: true },
  partition_key: { type: 'string', modifier: 'sanitizeLiberally', required: true },
  name: { type: 'string', modifier: 'sanitizeLiberally', required: true },
})

module.exports = Role
