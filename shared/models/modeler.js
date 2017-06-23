// modeler.js
const obey = require('obey')
const uuidV4 = require('uuid/v4')
const isURL = require('validator/lib/isURL')
const isWhitelisted = require('validator/lib/isWhitelisted')
const { registerSanitizers } = require('../helpers/sanitizers')


const _isUrl = value => {
	if (typeof(value) !== 'string') value = '' + value
	return isURL(value)
}

const _isTime = value => {
  if (typeof(value) !== 'string') value = '' + value
  return isWhitelisted(value, "0123456789:")
}

obey.creator('timestamp', () => new Date().getTime())
obey.creator('uuid', () => uuidV4())

obey.modifier('upperCase', val => val.toUpperCase())
obey.modifier('timestamp', () => new Date().getTime())

registerSanitizers(obey)

obey.type('customUrl', context => {
  if(!_isUrl(context.value)) context.fail(`${context.key} is not a valid Url`)
})

obey.type('time', context => {
  if(!_isTime(context.value)) context.fail(`${context.key} is not a valid Time`)
})

module.exports = obey
