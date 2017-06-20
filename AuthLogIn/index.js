const cas = require('../shared/cas')
const { redirect } = require('../shared/helpers')


module.exports = (context, req) => {
  redirect(context, cas.loginUrl)
}
