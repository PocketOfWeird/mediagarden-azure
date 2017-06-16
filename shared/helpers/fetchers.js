// shared/helpers/fetchers.js
const fetch = require('node-fetch')
const { isUrl } = require('./checkers')


const _rejected = message => new Promise((resolve, reject) => reject(message))

const postIt = (url, key, data) => {
  if (!isUrl(url)) return _rejected('Invalid url')

  const body = JSON.stringify(data)

  const options = {
    method: 'POST',
    headers: {
      'Content-Type':'application/json',
      'api-key': key
    },
    body
  }

  return fetch(url, options)
}

module.exports = {
  postIt
}
