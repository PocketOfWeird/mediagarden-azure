const CAS = require('simple-cas-interface')

module.exports = new CAS({
  serverUrl: process.env.cas_url,
  serviceUrl: process.env.host_url + 'auth/casHandler'
})
