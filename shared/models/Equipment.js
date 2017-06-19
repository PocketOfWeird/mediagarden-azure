// shared/models/Equipment.js
const modeler = require('./modeler')

const Equipment = modeler.model({
  id: { type: 'uuid', creator: 'uuid', required: true },
  partition_key: { type: 'string', modifier: 'sanitizeLiberally', required: true },
  name: { type: 'string', modifier: 'sanitizeLiberallyWithSpaces', required: true },
  description: { type: 'string', modifier: 'sanitize', required: true },
  location: { type: 'string', modifier: 'sanitizeLiberally', required: true },
  picker_location: { type: 'string', modifier: 'sanitizeLiberallyWithSpaces', required: true },
  uploaded: { type: 'number', creator: 'timestamp' },
  uploaded_by: { type: 'string', required: true },
  last_updated: { type: 'number', modifier: 'timestamp' },
  last_updated_by: { type: 'string', required: true },
  pic_url: { type: 'customUrl' },
})
/*

    hasModel,
    hasBarcode,
    hasStatus,
    inKit,
    inCategory,
    inReservation,
    availableToCourse,

*/
module.exports = Equipment
