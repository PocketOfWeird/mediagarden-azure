// shared/helpers/checkers.js
const validator = require('validator')
const permissions = require('../auth/permissions')


const current = user => ({
	allowedTo: (action, resource, meta) => permissions[resource][action](user, meta)
})

const isUrl = value => {
	if (typeof(value) !== 'string') value = '' + value
	return validator.isURL(value)
}

module.exports = {
	current,
	isUrl,
}
