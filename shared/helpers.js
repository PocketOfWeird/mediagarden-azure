const roleGroups = {
	all: ['Faculty', 'Staff', 'Student']
	fasta: ['Faculty', 'Staff'],
	fa: ['Faculty'],
	sta: ['Staff'],
	stu: ['Student']
}

const checkRoles = (action, roleGroup, errorCb, successCb) => {
	if (roleGroups[roleGroup].includes(action.meta.user.attributes.primary_role)) {
		successCb()
	} else {
		errorCb()
	}
}

const errorAction = message => ({
	type: 'SERVER_ERROR',
	payload: new Error(message),
	error: true
})

const jsonToBase64Str = json => new Buffer(JSON.stringify(json)).toString("base64")


module.exports  = {
	checkRoles,
	errorAction,
	jsonToBase64Str
}
