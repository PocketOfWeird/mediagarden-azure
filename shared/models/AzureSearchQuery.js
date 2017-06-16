// AzureSearchQuery.js
const modeler = require('./modeler')

const AzureSearchQuery = modeler.model({
  count: { type: 'boolean' },
  facets: { type: 'array', values: { type: 'string', modifier: 'sanitizeFacets' } },
  filter: { type: 'string', modifier: 'sanitizeOData' },
  highlight: { type: 'string', modifier: 'sanitizeSearchFields' },
  highlightPreTag: { type: 'string', modifier: 'sanitizeLiberally' },
  highlightPostTag: { type: 'string', modifier: 'sanitizeLiberally' },
  orderby: { type: 'string', modifier: 'sanitizeOData' },
  scoringParameters: { type: 'array', values: { type: 'string', modifier: 'sanitizeWithCommas' } },
  scoringProfile: { type: 'string', modifier: 'sanitizeLiberally' },
  search: { type: 'string', modifier: 'sanitizeSimpleQuery' },
  searchFields: { type: 'string', modifier: 'sanitizeSearchFields' },
  searchMode: { type: 'string', accept: ['any', 'all'] },
  select: { type: 'string', modifier: 'sanitizeSearchFields' },
  skip: { type: 'number' },
  top: { type: 'number' }
})

module.exports = AzureSearchQuery
