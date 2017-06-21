// shared/helpers/fetchers.js
const fetch = require('node-fetch')
const { isUrl } = require('./checkers')


const _rejected = message => new Promise((resolve, reject) => reject(message))

const getIt = (url, key, headers) => {
  if (!isUrl(url)) return _rejected('Invalid url')

  const options = {
    headers: headers || {
      'Content-Type':'application/json',
      'api-key': key
    }
  }

  return fetch(url, options)
}

const postIt = (url, key, data, headers) => {
  if (!isUrl(url)) return _rejected('Invalid url')

  const body = JSON.stringify(data)

  const options = {
    method: 'POST',
    body,
    headers: headers || {
      'Content-Type':'application/json',
      'api-key': key
    }
  }

  return fetch(url, options)
}

module.exports = {
  getIt,
  postIt
}
