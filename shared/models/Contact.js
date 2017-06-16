// shared/models/Contact.js
const modeler = require('./modeler')


const Contact = modeler.model({
  id: { type: 'uuid', creator: 'uuid', required: true },
  partition_key: { type: 'string', modifier: 'sanitizeLiberally', required: true },
  username: { type: 'string', modifier: 'sanitizeLiberally', required: true },
  name: { type: 'string', modifier: 'sanitizeLiberallyWithSpaces', required: true },
})
/*
const Contact = modeler.model({
  id: { type: 'string' },
  label: { type: 'string', accept: 'contact', required: true },
  type: { type: 'string', accept: 'vertex', required: true },
  outE: { type: 'object', keys: {
    hasRole: { type: 'array', values: { type: 'object', keys: {
      id: { type: 'string' },
      inV: { type: 'string' },
    }}},
    inCourse: { type: 'array', values: { type: 'object', keys: {
      id: { type: 'string' },
      inV: { type: 'string' },
    }}},
  }},
  properties: { type: 'object', keys: {
    partition_key: { type: 'array',  values: { type: 'object', keys: {  // username
      value: { type: 'string', modifier: 'sanitizeLiberally', required: true }
    }}},
    username: { type: 'array', values: { type: 'object', keys: {
      value: { type: 'string', modifier: 'sanitizeLiberally', required: true }
    }}},
    name: { type: 'array', values: { type: 'object', keys: {
      value: { type: 'string', modifier: 'sanitizeLiberallyWithSpaces', required: true }
    }}},
    pic_url: { type: 'array', values: { type: 'object', keys: {
      value: { type: 'customUrl' }
    }}}
  }}
})
*/
module.exports = Contact
