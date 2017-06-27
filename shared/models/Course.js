// shared/models/Course.js
const modeler = require('./modeler')


const Course = modeler.model({
  id: { type: 'uuid', creator: 'uuid', required: true },
  partition_key: { type: 'string', modifier: 'sanitizeLiberally', required: true },
  code: { type: 'string', modifier: 'sanitizeLiberally', required: true },
  description: { type: 'string', modifier: 'sanitize', required: true },
  instructor: { type: 'uuid', required: true },
  location: { type: 'string', modifier: 'sanitize', required: true },
  semester: { type: 'string', modifier: 'sanitizeLiberally', required: true },
  uploaded: { type: 'number', creator: 'timestamp' },
  uploaded_by: { type: 'string', required: true },
  last_updated: { type: 'number', modifier: 'timestamp' },
  last_updated_by: { type: 'string', required: true },
  students: { type: 'array', values: { type: 'uuid' }},
})

module.exports = Course
