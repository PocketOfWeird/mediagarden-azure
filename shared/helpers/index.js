// helpers.js
const action_types = require('./action_types')


const dataAction = (data, action) => ({
	type: action_types.SERVER_DATA,
	payload: {
		data
	},
	meta: {
		action
	}
})

const errorAction = (error, action) => ({
	type: action_types.SERVER_ERROR,
	payload: typeof(error) === 'string' ? new Error(error) : error,
	error: true,
	meta: {
		error: error + '',
		action
	}
})

const jsonToBase64Str = json => new Buffer(JSON.stringify(json)).toString("base64")

const sendData = (data, context, status, action) => {
	context.res.headers = { 'Content-Type': 'application/json' }
	context.res.status = status || 200
	context.res.body = { data: dataAction(data) }
	context.done()
}

const sendError = (error, context, status, action) => {
	context.res.headers = { 'Content-Type': 'application/json' }
	context.res.status = status || 500
  context.res.body = { error: errorAction(error) }
  context.done()
}

const sendDataToClient = (data, context, action) => {
	context.bindings.clientStateOut = [dataAction(data, action)]
	context.done()
}

const sendErrorToClient = (error, context, action) => {
  context.bindings.clientStateOut = [errorAction(error, action)]
  context.done()
}

module.exports = {
	jsonToBase64Str,
	sendData,
	sendError,
	sendDataToClient,
	sendErrorToClient,
}
