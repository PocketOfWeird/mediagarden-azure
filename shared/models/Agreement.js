// Agreement.js
const modeler = require('./modeler')

const Agreement = modeler.model({
  RowKey: { type: 'uuid', creator: 'uuid', required: true },
  created: { type: 'number', creator: 'timestamp' },
  created_by: { type: 'string', required: true },
  last_updated: { type: 'number', modifier: 'timestamp' },
  last_updated_by: { type: 'string', required: true },
  PartitionKey: { type: 'string', allow: ['liability', 'author', 'access'], required: true },
  type: { type: 'string', allow: ['liability', 'author', 'access'], required: true },
  text: { type: 'string', modifier: 'sanitizeConservatively', required: true },
  etag: { type: 'string' }
})

module.exports = Agreement