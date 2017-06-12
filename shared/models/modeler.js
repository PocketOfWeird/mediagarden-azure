// modeler.js
const obey = require('obey')
const uuidV4 = require('uuid/v4')
const {
  isUrl,
  sanitize,
  sanitizeWithCommas,
  sanitizeConservatively
} = require('../helpers')

obey.creator('timestamp', () => new Date().getTime())
obey.creator('uuid', () => uuidV4())

obey.modifier('upperCase', val => val.toUpperCase())
obey.modifier('timestamp', () => new Date().getTime())
obey.modifier('sanitize', val => sanitize(val))
obey.modifier('sanitizeWithCommas', val => sanitizeWithCommas(val))
obey.modifier('sanitizeConservatively', val => sanitizeConservatively(val))

obey.type('customUrl', context => {
  if(!isUrl(context.value)) context.fail(`${context.key} is not a valid Url`)
})

module.exports = obey
