// Script.js
const modeler = require('./modeler')

const Script = modeler.model({
  id: { type: 'uuid', creator: 'uuid', required: true },
  title: { type: 'string', modifier: 'sanitize', required: true },
  genre: { type: 'string', modifier: 'sanitize', required: true },
  uploaded: { type: 'number', creator: 'timestamp' },
  uploaded_by: { type: 'string', required: true },
  last_updated: { type: 'number', modifier: 'timestamp' },
  last_updated_by: { type: 'string', required: true },
  agreement_id: { type: 'string', required: true },
  author_id: { type: 'string' },
  author_name: { type: 'string', modifier: 'sanitize', required: true },
  author_agreement: { type: 'uuid', required: true },
  num_downloaded: { type: 'number', default: 0 },
  url: { type: 'customUrl' },
  sample_url: { type: 'customUrl' },
  filename: { type: 'string' },
  sample_filename: { type: 'string' }
})

module.exports = Script
