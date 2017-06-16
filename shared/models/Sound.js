// shared/models/Sound.js
const modeler = require('./modeler')

const Sound = modeler.model({
  id: { type: 'uuid', creator: 'uuid', required: true },
  title: { type: 'string', modifier: 'sanitize', required: true },
  type: { type: 'string', accept: ['sound', 'music'], required: true },
  category: { type: 'string', modifier: 'sanitize', required: true },
  keywords: { type: 'string', modifier: 'sanitizeWithCommas' },
  uploaded: { type: 'number', creator: 'timestamp' },
  uploaded_by: { type: 'string', required: true },
  last_updated: { type: 'number', modifier: 'timestamp' },
  last_updated_by: { type: 'string', required: true },
  author_id: { type: 'string' },
  author_name: { type: 'string', modifier: 'sanitize', required: true },
  num_downloaded: { type: 'number', default: 0 },
  url: { type: 'customUrl', required: true },
  filename: { type: 'string', required: true }
})

module.exports = Sound
