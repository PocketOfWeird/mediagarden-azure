// shared/models/Equipment.js
const modeler = require('./modeler')

const Equipment = modeler.model({
  equipment: { type: 'object', required: true, keys: {
    id: { type: 'uuid', creator: 'uuid', required: true },
    partition_key: { type: 'string', modifier: 'sanitizeLiberally', required: true },
    name: { type: 'string', modifier: 'sanitizeLiberallyWithSpaces', required: true },
    manufacturer: { type: 'string', modifier: 'sanitizeLiberallyWithSpaces', required: true },
    model: { type: 'string', modifier: 'sanitizeLiberallyWithSpaces', required: true },
    uploaded: { type: 'number', creator: 'timestamp' },
    uploaded_by: { type: 'string', required: true },
    last_updated: { type: 'number', modifier: 'timestamp' },
    last_updated_by: { type: 'string', required: true },
    pic_url: { type: 'customUrl' },
  }},
  barcodes: { type: 'array', required: true, values: { type: 'uuid' }},
  categories: { type: 'array', values: { type: 'uuid' }},
})

module.exports = Equipment
