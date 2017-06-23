// shared/auth/index.js
const permissions = require('./permissions')
const { hasRole } = require('./roles')


const authorized = user => ({
	allowedTo: (action, resource, meta) => {
		if (permissions[resource] && permissions[resource][action]) {
			return permissions[resource][action](user, meta)
		} else {
			return false
		}
	},
	isLabWorker: () => hasRole('labworkeradmin', user), 
})

module.exports = authorized
