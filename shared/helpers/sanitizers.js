// sanitizers.js
const validator = require('validator')

const _baseSanitizer = characters => value => {
	if (!value) return
	if (typeof(value) !== 'string') value = '' + value
  return validator.whitelist(value, characters)
}

const sanitize = _baseSanitizer("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 :'-_")

const sanitizeConservatively = _baseSanitizer("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 \\/:'\\-,\\(\\)\\._\\?\\!")

const sanitizeFacets = _baseSanitizer("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789:,\\+\\-\\|_")

const sanitizeLiberally = _baseSanitizer("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_")

const sanitizeLiberallyWithSpaces = _baseSanitizer("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 -_")

const sanitizeOData = _baseSanitizer("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 \\/:'-,\\(\\)._")

const sanitizeSearchFields = _baseSanitizer("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 -,_")

const sanitizeSimpleQuery = _baseSanitizer("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 \\+\\|\\-\\*\"\\(\\)_")

const sanitizeWithCommas = _baseSanitizer("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 :'-,_")

const registerSanitizers = obey => {
	obey.modifier('sanitize', val => sanitize(val))
	obey.modifier('sanitizeConservatively', val => sanitizeConservatively(val))
	obey.modifier('sanitizeFacets', val => sanitizeFacets(val))
	obey.modifier('sanitizeLiberally', val => sanitizeLiberally(val))
	obey.modifier('sanitizeLiberallyWithSpaces', val => sanitizeLiberallyWithSpaces(val))
	obey.modifier('sanitizeOData', val => sanitizeOData(val))
	obey.modifier('sanitizeSearchFields', val => sanitizeSearchFields(val))
	obey.modifier('sanitizeSimpleQuery', val => sanitizeSimpleQuery(val))
	obey.modifier('sanitizeWithCommas', val => sanitizeWithCommas(val))
}

module.exports = {
	sanitize,
	sanitizeConservatively,
	sanitizeFacets,
	sanitizeLiberally,
	sanitizeLiberallyWithSpaces,
	sanitizeOData,
	sanitizeSearchFields,
	sanitizeSimpleQuery,
	sanitizeWithCommas,
	registerSanitizers
}
