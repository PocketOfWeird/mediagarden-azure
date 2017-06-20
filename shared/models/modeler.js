// modeler.js
const obey = require('obey')
const uuidV4 = require('uuid/v4')
const { isUrl } = require('../helpers/checkers')
const { registerSanitizers } = require('../helpers/sanitizers')

obey.creator('timestamp', () => new Date().getTime())
obey.creator('uuid', () => uuidV4())

obey.modifier('upperCase', val => val.toUpperCase())
obey.modifier('timestamp', () => new Date().getTime())

registerSanitizers(obey)

obey.type('customUrl', context => {
  if(!isUrl(context.value)) context.fail(`${context.key} is not a valid Url`)
})

module.exports = obey
