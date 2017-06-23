// shared/models/Agreement.js
const modeler = require('./modeler')
const types = require('./types')


const Agreement = modeler.model({
  RowKey: { type: 'string', creator: 'date_rowkey', required: true },
  id: { type: 'string', equalTo: 'RowKey' },
  uploaded: { type: 'number', creator: 'timestamp' },
  uploaded_by: { type: 'string', required: true },
  last_updated: { type: 'number', modifier: 'timestamp' },
  last_updated_by: { type: 'string', required: true },
  PartitionKey: { type: 'string', allow: types.agreements, required: true },
  type: { type: 'string', equalTo: 'PartitionKey', required: true },
  text: { type: 'string', modifier: 'sanitizeConservatively', required: true },
})

module.exports = Agreement
