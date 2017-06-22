// shared/models/Contact.js
const modeler = require('./modeler')
const states = require('../helpers/states.js')


const Contact = modeler.model({
  id: { type: 'uuid', creator: 'uuid', required: true },
  partition_key: { type: 'string', modifier: 'sanitizeLiberally', required: true },
  username: { type: 'string', modifier: 'sanitizeLiberally', required: true },
  name: { type: 'string', modifier: 'sanitizeLiberallyWithSpaces', required: true },
  uploaded: { type: 'number', creator: 'timestamp' },
  uploaded_by: { type: 'string', required: true },
  last_updated: { type: 'number', modifier: 'timestamp' },
  last_updated_by: { type: 'string', required: true },
  address_street: { type: 'string', modifier: 'sanitizeLiberallyWithSpaces', max: 45 },
  address_city:  { type: 'string', modifier: 'sanitizeLiberallyWithSpaces', max: 45 },
  address_state: { type: 'string', max: 2, accept: states.abbrvs, modifier: 'upperCase' },
  address_zip: { type: 'number', min: 10000, max: 99999 },
  phone_number: { type: 'phone:numeric', min: 7, max: 10 },
  phone_type: { type: 'string', accept: ['mobile','office','home'], requiredIf: 'phone_number' },
  phone_carrier: { type: 'string', requiredIf: { phone_type: 'mobile' }},
  status: { type: 'sting', allow: ['Active', 'Inactive'], default: 'Active' }
})

module.exports = Contact
