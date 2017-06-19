const _addQuotesIfString = value => typeof(value) === 'string' ? "'" + value + "'" : value

const _makePropsFromData = dataObject => {
  var propString = ""
  for ( key in dataObject ) {
    propString += ".property('" + key + "'," + _addQuotesIfString(dataObject[key]) + ")"
  }
  return propString
}

const generateStatement = (type, label, dataObject) => {
  switch (type) {
    case 'addV':
      return "g.addV('" + label + "')" + _makePropsFromData(dataObject)
    case 'addE':
      return "g.V('" + dataObject.id1 + "').addE('" + label + "').to(g.V('" + dataObject.id2 + "'))"
    default:
      return "g.V().count()"
  }
}

module.exports = {
    generateStatement
}
