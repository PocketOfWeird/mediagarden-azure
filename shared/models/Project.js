// shared/models/Project.js
const modeler = require('./modeler')


const Project = modeler.model({
  id: { type: 'uuid', creator: 'uuid', required: true },
  partition_key: { type: 'string', modifier: 'sanitizeLiberally', required: true },
  name: { type: 'string', modifier: 'sanitize', required: true },
  description: { type: 'string', modifier: 'sanitize', required: true },
  semester: { type: 'string', modifier: 'sanitizeLiberally', required: true },
  uploaded: { type: 'number', creator: 'timestamp' },
  uploaded_by: { type: 'string', required: true },
  last_updated: { type: 'number', modifier: 'timestamp' },
  last_updated_by: { type: 'string', required: true },
})

module.exports = Project
