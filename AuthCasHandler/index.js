// AuthCasHandler/index.js
const cas = require('../shared/auth/cas')
const token = require('../shared/auth/token')
const User = require('../shared/models/User')
const { sendData, sendError, redirect } = require('../shared/helpers')


module.exports = (context, req) => {
  if (!process.env.NODE_ENV === 'development') {
    cas.validateServiceTicket(req.query.ticket)
    .then(userData => {
      User.validate(userData)
      .then(user => {
        redirect(context, process.env.host_url + '#/login?token=' + token.sign(user))
      })
      .catch(error => sendError(error, context, 401))
    })
    .catch(error => sendError(error, context, 401))
  } else {
    redirect(context, process.env.host_url + 'app/#/login?token=' + token.signDev())
  }
}
