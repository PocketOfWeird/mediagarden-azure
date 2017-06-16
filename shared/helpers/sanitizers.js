// sanitizers.js
const validator = require('validator')

const _baseSanitizer = characters => value => {
	if (!value) return
	if (typeof(value) !== 'string') value = '' + value
  return validator.whitelist(value, characters)
}

const Sanitizers = {

	sanitize: _baseSanitizer("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 :'-_"),

	sanitizeConservatively: _baseSanitizer("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 :'-,\\s\\(\\)!?._"),

	sanitizeFacets: _baseSanitizer("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789:,\\+\\-\\|_"),

	sanitizeLiberally: _baseSanitizer("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_"),

	sanitizeLiberallyWithSpaces: _baseSanitizer("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 -_"),

	sanitizeOData: _baseSanitizer("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 \\/:'-,\\(\\)._"),

	sanitizeSearchFields: _baseSanitizer("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 -,_"),

	sanitizeSimpleQuery: _baseSanitizer("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 \\+\\|\\-\\*\"\\(\\)_"),

	sanitizeWithCommas: _baseSanitizer("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 :'-,_"),

}

module.exports = Sanitizers
