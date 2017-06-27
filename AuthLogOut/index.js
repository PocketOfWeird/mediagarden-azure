const { redirect } = require('../shared/helpers')


module.exports = (context, req) => {
  redirect(context, process.env.cas_url + 'logout')
}
