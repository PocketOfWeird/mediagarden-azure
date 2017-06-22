// shared/auth/permissions.js
const { hasRole } = require('./roles')

const _anybody = user => hasRole('any', user)

const _facStaffAdmin = user => hasRole('facstaffadmin', user)

const _labWorkerAdmin = user => hasRole('labworkeradmin', user)

const _ownerOrFacStaffAdmin = owner_id => (user, meta) => user.id === meta[owner_id] || _facStaffAdmin(user)

const permissions = {
  agreements: {
    POST: _facStaffAdmin,
  },
  barcodes: {
    POST: _labWorkerAdmin,
  },
  categories: {
    POST: _labWorkerAdmin,
  },
  equipment: {
    POST: _labWorkerAdmin,
  },
  scripts: {
    INDEX: _ownerOrFacStaffAdmin('author_id'),
    PUT: _ownerOrFacStaffAdmin('author_id'),
    QUERY: _anybody,
    SAMPLE: _ownerOrFacStaffAdmin('author_id'),
  },
  sounds: {
    POST: _ownerOrFacStaffAdmin('author_id'),
    QUERY: _anybody,
  },
}

module.exports = permissions
