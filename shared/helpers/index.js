// shared/helpers/index.js
const action_types = require('./action_types')


const _dataAction = (data) => ({
	type: action_types.SERVER_DATA,
	payload: { data }
})

const _errorAction = (error) => ({
	type: action_types.SERVER_ERROR,
	payload: typeof(error) === 'string' ? new Error(error) : error,
	error: true
})

const sendData = (data, context, status) => {
	context.res.headers = { 'Content-Type': 'application/json' }
	context.res.status = status || 200
	context.res.body = { data: _dataAction(data) }
	context.done()
}

const sendError = (error, context, status) => {
	context.res.headers = { 'Content-Type': 'application/json' }
	context.res.status = status || 500
  context.res.body = { error: { message: error + '' }, data: _errorAction(error) }
  context.done()
}

const redirect = (context, Location) => {
	context.res = {
    status: 302,
    headers: { Location },
    body: 'Redirecting...'
  }
  context.done()
}

const removeProps = props => ({
	from: object => Object.keys(object)
			.filter(key => !props.includes(key))
			.reduce((obj, key) => {
				obj[key] = object[key]
	    	return obj
			}, {})
})

module.exports = {
	sendData,
	sendError,
	redirect,
	removeProps,
}
