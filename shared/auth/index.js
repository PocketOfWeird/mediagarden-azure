// shared/auth/index.js
const permissions = require('./permissions')


const authorized = user => ({
	allowedTo: (action, resource, meta) => permissions[resource][action](user, meta)
})

module.exports = authorized
