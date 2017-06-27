// AuthCasHandler/index.js
const cas = require('../shared/auth/cas')
const token = require('../shared/auth/token')
const User = require('../shared/models/User')
const roles = require('../shared/auth/roles')
const { sendData, sendError, redirect } = require('../shared/helpers')


const _getRolesThenSendToken = (user, context, isDev) => {
  if (!isDev) {
    var userInfo = Object.assign({}, user)
    roles.getRoles(userInfo)
    .then(userRoles => {
      userInfo.roles = userRoles
      redirect(context, process.env.host_url + '#/login?token=' + token.sign(userInfo))
    })
    .catch((error, status) => sendError(error, context, status))
  } else {
    var devUser = token.devUser()
    roles.getRoles(devUser)
    .then(userRoles => {
      devUser.roles = userRoles
      redirect(context, process.env.host_url + 'app/#/login?token=' + token.signDev(devUser))
    })
    .catch((error) => sendError(error, context))
  }
}


module.exports = (context, req) => {
  const isDev = process.env.NODE_ENV === 'development'
  if (!isDev) {
    cas.validateServiceTicket(req.query.ticket)
    .then(userData => {
      User.validate(userData)
      .then(user => _getRolesThenSendToken(user, context))
      .catch(error => sendError(error, context, 401))
    })
    .catch(error => sendError(error, context, 401))
  } else {
    _getRolesThenSendToken(null, context, isDev)
  }
}
