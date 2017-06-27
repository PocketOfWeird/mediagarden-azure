// shared/models/EdgePostPayload.js
const modeler = require('./modeler')


const EdgePostPayload = modeler.model({
  id1: { type: 'uuid', required: true },
  id2: { type: 'uuid', required: true },
})

module.exports = EdgePostPayload
