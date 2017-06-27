// shared/auth/index.js
const permissions = require('./permissions')
const { hasRole } = require('./roles')


const authenticated = user => ({
	allowedTo: (action, resource, meta) => {
		if (permissions[resource] && permissions[resource][action]) {
			return permissions[resource][action](user, meta)
		} else {
			return false
		}
	},
	isLabWorker: () => hasRole('labworker', user),
	isFacStaffAdmin: () => hasRole('facStaff', user) || hasRole('admin', user),
})

module.exports = authenticated
