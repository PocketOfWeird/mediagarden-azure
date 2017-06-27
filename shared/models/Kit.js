// shared/models/Kit.js
const modeler = require('./modeler')

const Kit = modeler.model({
  kit: { type: 'object', required: true, keys: {
    id: { type: 'uuid', creator: 'uuid', required: true },
    partition_key: { type: 'sanitizeLiberallyWithSpaces', required: true },
    name: { type: 'string', modifier: 'sanitizeLiberallyWithSpaces', required: true },
    description: { type: 'string', modifier: 'sanitize' },
    uploaded: { type: 'number', creator: 'timestamp' },
    uploaded_by: { type: 'string', required: true },
    last_updated: { type: 'number', modifier: 'timestamp' },
    last_updated_by: { type: 'string', required: true },
  }},
  equipment: { type: 'array', required: true, values: { type: 'object', keys: {
    id: { type: 'uuid', required: true },
    qyt: { type: 'number', required: true }
  }}},
  categories: { type: 'array', required: true, values: { type: 'uuid' }},
})

module.exports = Kit
