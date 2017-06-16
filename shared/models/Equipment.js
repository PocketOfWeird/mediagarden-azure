// shared/models/Equipment.js
const modeler = require('./modeler')

const Equipment = modeler.model({
  id: { type: 'string' },
  label: { type: 'string', accept: 'equipment', required: true },
  type: { type: 'string', accept: 'vertex', required: true },
  outE: { type: 'object', keys: {
    hasModel: { type: 'array', values: { type: 'object', keys: {
      id: { type: 'string' },
      inV: { type: 'string' },
    }}},
    hasBarcode: { type: 'array', values: { type: 'object', keys: {
      id: { type: 'string' },
      inV: { type: 'string' },
    }}},
    hasStatus: { type: 'array', values: { type: 'object', keys: {
      id: { type: 'string' },
      inV: { type: 'string' },
    }}},
    inKit: { type: 'array', values: { type: 'object', keys: {
      id: { type: 'string' },
      inV: { type: 'string' },
    }}},
    inCategory: { type: 'array', values: { type: 'object', keys: {
      id: { type: 'string' },
      inV: { type: 'string' },
    }}},
    inReservation: { type: 'array', values: { type: 'object', keys: {
      id: { type: 'string' },
      inV: { type: 'string' },
    }}},
    availableToCourse: { type: 'array', values: { type: 'object', keys: {
      id: { type: 'string' },
      inV: { type: 'string' },
    }}},
  }},
  properties: { type: 'object', keys: {
    partition_key: { type: 'array', values: { type: 'object', keys: { // location
      value: { type: 'string', modifier: 'sanitizeLiberally', required: true }
    }}},
    name: { type: 'array', values: { type: 'object', keys: {
      value: { type: 'string', modifier: 'sanitizeLiberallyWithSpaces', required: true }
    }}},
    description: { type: 'array', values: { type: 'object', keys: {
      value: { type: 'string', modifier: 'sanitize', required: true }
    }}},
    location: { type: 'array', values: { type: 'object', keys: {
      value: { type: 'string', modifier: 'sanitizeLiberally', required: true }
    }}},
    picker_location: { type: 'array', values: { type: 'object', keys: {
      value: { type: 'string', modifier: 'sanitizeLiberallyWithSpaces', required: true }
    }}},
    uploaded: { type: 'array', values: { type: 'object', keys: {
      value: { type: 'number', creator: 'timestamp' }
    }}},
    uploaded_by: { type: 'array', values: { type: 'object', keys: {
      value: { type: 'string', required: true }
    }}},
    last_updated: { type: 'array', values: { type: 'object', keys: {
      value: { type: 'number', modifier: 'timestamp' }
    }}},
    last_updated_by: { type: 'array', values: { type: 'object', keys: {
      value: { type: 'string', required: true }
    }}},
    pic_url: { type: 'array', values: { type: 'object', keys: {
      value: { type: 'customUrl' }
    }}}
  }}
})

module.exports = Equipment
