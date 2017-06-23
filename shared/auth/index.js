// shared/auth/index.js
const permissions = require('./permissions')


const authorized = user => ({
	allowedTo: (action, resource, meta) => {
		if (permissions[resource] && permissions[resource][action]) {
			return permissions[resource][action](user, meta)
		} else {
			return false
		}
	}
})

module.exports = authorized
