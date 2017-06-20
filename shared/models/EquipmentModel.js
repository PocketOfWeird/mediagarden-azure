// shared/models/EquipmentModel.js
const modeler = require('./modeler')


const EquipmentModel = modeler.model({
  id: { type: 'uuid', creator: 'uuid', required: true },
  partition_key: { type: 'string', modifier: 'sanitizeLiberally', required: true },
  name: { type: 'string', modifier: 'sanitizeLiberally', required: true },
  uploaded: { type: 'number', creator: 'timestamp' },
  uploaded_by: { type: 'string', required: true },
  last_updated: { type: 'number', modifier: 'timestamp' },
  last_updated_by: { type: 'string', required: true },
})

module.exports = EquipmentModel
