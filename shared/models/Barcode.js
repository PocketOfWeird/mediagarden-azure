// shared/models/Barcode.js
const modeler = require('./modeler')


const Barcode = modeler.model({
  id: { type: 'uuid', creator: 'uuid', required: true },
  partition_key: { type: 'string', modifier: 'sanitizeLiberally', required: true },
  location: { type: 'string', modifier: 'sanitizeLiberally', required: true },
  description: { type: 'string', modifier: 'sanitize' },
  picker_location: { type: 'string', modifier: 'sanitizeLiberallyWithSpaces', required: true },
  tag: { type: 'string', modifier: 'sanitizeLiberally', required: true },
  uploaded: { type: 'number', creator: 'timestamp' },
  uploaded_by: { type: 'string', required: true },
  last_updated: { type: 'number', modifier: 'timestamp' },
  last_updated_by: { type: 'string', required: true },
})

module.exports = Barcode
