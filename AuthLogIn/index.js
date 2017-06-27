const cas = require('../shared/auth/cas')
const { redirect } = require('../shared/helpers')


module.exports = (context, req) => {
  redirect(context, cas.loginUrl)
}
