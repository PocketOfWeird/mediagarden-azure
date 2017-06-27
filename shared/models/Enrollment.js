// shared/models/Enrollment.js
const modeler = require('./modeler')


const Enrollment = modeler.model({
  RowKey: { type: 'uuid', creator: 'uuid', required: true },
  id: { type: 'uuid', equalTo: 'RowKey' },
  course: { type: 'uuid', required: true },
  PartitionKey: { type: 'string', equalTo: 'course', required: true },
  contact: { type: 'uuid', required: true },
  status: { type: 'string', allow: ['Pending', 'Rejected', 'Accepted'], default: 'Pending' },
  uploaded: { type: 'number', creator: 'timestamp' },
  uploaded_by: { type: 'string', required: true },
  last_updated: { type: 'number', modifier: 'timestamp' },
  last_updated_by: { type: 'string', required: true },
})

module.exports = Enrollment
