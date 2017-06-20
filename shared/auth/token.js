const jwt = require('jsonwebtoken')


const sign = user => {
  const signingUser = { id: user.user, name: user.attributes.name, role: user.attributes.primary_role }
  return jwt.sign(signingUser, process.env.access_key, { expiresIn: process.env.access_expires })
}

var signDev = () => {}

if (process.env.NODE_ENV === 'development') {
  signDev = () => {
    const signingUser = { id: process.env.local_user, name: process.env.local_name, role: process.env.local_role }
    return jwt.sign(signingUser, process.env.access_key, { expiresIn: process.env.access_expires })
  }
}

const verify = req => new Promise((resolve, reject) => {
  const token = req.headers['mediagarden-access-token']
  if (token) {
    jwt.verify(token, process.env.access_key, (err, user) => {
      if (!err) {
        resolve(user)
      } else {
        reject('Invalid token')
      }
    })
  } else {
    reject('No token provided')
  }
})

module.exports = {
  sign,
  signDev,
  verify
}

/*
X-MS-CLIENT-PRINCIPAL-NAME
X-MS-CLIENT-PRINCIPAL-ID
*/
