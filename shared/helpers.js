// helpers.js
const validator = require('validator')

const roleGroups = {
	all: ['Faculty', 'Staff', 'Student'],
	fasta: ['Faculty', 'Staff'],
	fa: ['Faculty'],
	sta: ['Staff'],
	stu: ['Student']
}

const checkRoles = (action, roleGroup, errorCb, successCb) => {
	if (!roleGroups[roleGroup].includes(action.meta.user.attributes.primary_role)) {
		return errorCb()
	}
	return successCb()
}

const dataAction = (data, action) => ({
	type: 'SERVER_DATA',
	payload: {
		data
	},
	meta: {
		action
	}
})

const errorAction = (error, action) => ({
	type: 'SERVER_ERROR',
	payload: typeof(error) === 'string' ? new Error(message) : error,
	error: true,
	meta: {
		error: error + '',
		action
	}
})

const jsonToBase64Str = json => new Buffer(JSON.stringify(json)).toString("base64")

const sanitize = value => {
  if (typeof(value) !== 'string') value = '' + value
  return validator.whitelist(value, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789 :'-")
}

const sanitizeWithCommas = value => {
  if (typeof(value) !== 'string') value = '' + value
  return validator.whitelist(value, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789 :'-,")
}

const sanitizeConservatively = value => {
  if (typeof(value) !== 'string') value = '' + value
  return validator.whitelist(value, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789 :'-,\\\r\\\n\\(\\)!?.")
}

const sendDataToClient = (data, context, action) => {
	context.bindings.clientStateOut = [dataAction(data, action)]
	context.done()
}

const sendErrorToClient = (error, context, action) => {
  context.bindings.clientStateOut = [errorAction(error, action)]
  context.done()
}

module.exports  = {
	checkRoles,
	jsonToBase64Str,
	sanitize,
  sanitizeWithCommas,
  sanitizeConservatively,
	sendDataToClient,
	sendErrorToClient
}
