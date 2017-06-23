const TYPES = {
  addVertex: 'addVertex',
  addEdge: 'addEdge',
}

const _addQuotesIfString = value => typeof(value) === 'string' ? "'" + value + "'" : value

const _makePropsFromData = data => {
  var propString = ""
  for ( key in data ) {
    propString += ".property('" + key + "'," + _addQuotesIfString(data[key]) + ")"
  }
  return propString
}

const _addVertex = (label, data) => ".addV('" + label + "')" + _makePropsFromData(data)

const _getVertex = id => ".V('" + id + "')"

const _addEdge = (relationship, to, props) => ".addE('" + relationship + "').to(g.V('" + to + "'))"  + _makePropsFromData(props)

const generate = (type, label, data) => {
  switch (type) {
    case TYPES.addVertex:
      return "g" + _addVertex(label, data)
    case TYPES.addEdge:
      return "g" + _getVertex(data.from) + _addEdge(label, data.to, data.props)
    default:
      return "g.V().count()"
  }
}

module.exports = {
    generate,
    TYPES,
}
