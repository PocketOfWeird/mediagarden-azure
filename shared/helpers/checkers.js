// shared/helpers/checkers.js
const validator = require('validator')


const _roleGroups = {
	all: ['Faculty', 'Staff', 'Student'],
	fasta: ['Faculty', 'Staff'],
	fa: ['Faculty'],
	sta: ['Staff'],
	stu: ['Student']
}

const allowedToPostScripts = action => action.meta.user.user === action.payload.author_id || _roleGroups.fasta.includes(action.meta.user.attributes.primary_role)

const checkRoles = (action, roleGroup, errorCb, successCb) => {
	if (!_roleGroups[roleGroup].includes(action.meta.user.attributes.primary_role)) {
		return errorCb()
	}
	return successCb()
}

const isUrl = value => {
	if (typeof(value) !== 'string') value = '' + value
	return validator.isURL(value)
}

module.exports = {
	allowedToPostScripts,
	checkRoles,
	isUrl,
}
