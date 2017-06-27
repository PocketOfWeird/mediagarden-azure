// shared/models/ContactPut.js
const modeler = require('./modeler')
const states = require('../helpers/states.js')


const ContactPut = modeler.model({
  id: { type: 'uuid', required: true },
  partition_key: { type: 'string', modifier: 'sanitizeLiberally'},
  username: { type: 'string', modifier: 'sanitizeLiberally' },
  name: { type: 'string', modifier: 'sanitizeLiberallyWithSpaces' },
  email: { type: 'email' },
  grad_date: { type: 'number' },
  uploaded: { type: 'number', creator: 'timestamp' },
  uploaded_by: { type: 'string' },
  last_updated: { type: 'number', modifier: 'timestamp' },
  last_updated_by: { type: 'string', required: true },
  address_street1: { type: 'string', modifier: 'sanitizeLiberallyWithSpaces', max: 45 },
  address_street2: { type: 'string', modifier: 'sanitizeLiberallyWithSpaces', max: 45 },
  address_city:  { type: 'string', modifier: 'sanitizeLiberallyWithSpaces', max: 45 },
  address_state: { type: 'string', max: 2, accept: states.abbrvs },
  address_zip: { type: 'number', min: 10000, max: 99999 },
  phone_number: { type: 'phone:numeric', min: 7, max: 10 },
  phone_type: { type: 'string', accept: ['Mobile','Office','Home'] },
  phone_carrier: { type: 'string' },
  status: { type: 'string', allow: ['Active', 'Inactive'] },
  notifyEnrollments: { type: 'string', allow: ['Email', 'Text', 'None'] }
})

module.exports = ContactPut
