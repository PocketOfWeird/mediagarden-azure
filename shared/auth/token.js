const jwt = require('jsonwebtoken')


const sign = user => {
  const signingUser = { id: user.user, name: user.attributes.name, roles: user.roles }
  return jwt.sign(signingUser, process.env.access_key, { expiresIn: process.env.access_expires })
}

var devUser = () => {}

if (process.env.NODE_ENV === 'development') {
  devUser = () => ({
    user: process.env.local_user,
    attributes: {
      name: process.env.local_name,
      isStudent: 'Student',
      isStaff: 'Staff'
    }
  })
}

var signDev = () => {}

if (process.env.NODE_ENV === 'development') {
  signDev = devUser => {
    signingUser = { id: devUser.user, name: devUser.attributes.name, roles: devUser.roles }
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
  devUser,
  sign,
  signDev,
  verify
}

/*
X-MS-CLIENT-PRINCIPAL-NAME
X-MS-CLIENT-PRINCIPAL-ID
*/
