// shared/models/Reservation.js
const modeler = require('./modeler')

const Reservation = modeler.model({
  reservation: { type: 'object', required: true, keys: {
    id: { type: 'uuid', creator: 'uuid', required: true },
    partition_key: { type: 'string', modifier: 'sanitizeLiberally', required: true },
    owner: { type: 'uuid', required: true },
    checkin: { type: 'number', required: true },
    checkout: { type: 'number', required: true },
    semester: { type: 'string', modifier: 'sanitizeLiberally', required: true },
    uploaded: { type: 'number', creator: 'timestamp' },
    uploaded_by: { type: 'string', required: true },
    last_updated: { type: 'number', modifier: 'timestamp' },
    last_updated_by: { type: 'string', required: true },
  }},
  equipment: { type: 'array', requiredIfNot: 'kits', values: { type: 'uuid' }},
  kits: { type: 'array', requiredIfNot: 'equipment', values: { type: 'uuid' }},
})

module.exports = Reservation
