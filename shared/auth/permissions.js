// shared/auth/permissions.js
const { hasRole } = require('./roles')

const _anybody = user => hasRole('any', user)

const _facStaffAdmin = user => hasRole('facstaffadmin', user)

const _labWorkerAdmin = user => hasRole('labworkeradmin', user)

const _owner = owner_id => (user, meta) => user.id === meta[owner_id]

const _ownerOrFacStaffAdmin = owner_id => (user, meta) => _owner(owner_id) || _facStaffAdmin(user)

const _ownerOrLabWorkerAdmin = owner_id => (user, meta) => _owner(owner_id) || _labWorkerAdmin(user)

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
  contacts: {
    POST: _ownerOrLabWorkerAdmin('username')
  },
  equipment: {
    POST: _labWorkerAdmin,
  },
  hours: {
    GET: _anybody,
    POST: _labWorkerAdmin,
  },
  kits: {
    POST: _labWorkerAdmin,
  },
  reservations: {
    POST: _labWorkerAdmin, //NOTE: need to call graph and check if current user is connected to the contact submitted with the reservation
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
