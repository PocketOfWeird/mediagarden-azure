const jsonToBase64Str = json => new Buffer(JSON.stringify(json)).toString("base64")

module.exports  = {
	jsonToBase64Str
}
