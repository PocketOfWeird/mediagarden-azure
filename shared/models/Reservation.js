// shared/models/Reservation.js
const modeler = require('./modeler')

const Reservation = modeler.model({
  id: { type: 'uuid', creator: 'uuid', required: true },
  partition_key: { type: 'string', modifier: 'sanitizeLiberally', required: true },
  checkin: { type: 'number', required: true },
  checkout: { type: 'number', required: true },
  description: { type: 'string', modifier: 'sanitize', required: true },
  semester: { type: 'string', modifier: 'sanitizeLiberally', required: true },
  uploaded: { type: 'number', creator: 'timestamp' },
  uploaded_by: { type: 'string', required: true },
  last_updated: { type: 'number', modifier: 'timestamp' },
  last_updated_by: { type: 'string', required: true },
})

module.exports = Reservation
