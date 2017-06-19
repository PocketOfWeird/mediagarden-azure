// shared/models/graphModels.js
const Contact = require('./Contact')
const Role = require('./Role')

module.exports = {
  resources: {
    contacts: [Contact, 'contact', 'username'],
    roles: [Role, 'role', 'name'],
  },
  relationships: {
    'contacts': {
      'roles': 'hasRole',
    },
    'roles': {
      contacts: 'hasRole',
    },
  }
}
