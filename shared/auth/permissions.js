// shared/auth/permissions.js
const { hasRole } = require('./roles')

const _anybody = user => hasRole('any', user)

const _admin = user => hasRole('admin', user)

const _facStaff = user => hasRole('facStaff', user)

const _facStaffAdmin = user => _facStaff(user) || _admin(user)

const _labWorker = user => hasRole('labworker', user)

const _labWorkerAdmin = user => _labWorker(user) || _admin(user)

const _owner = owner_id => (user, meta) => user.id === meta[owner_id]

const _ownerOrFacStaffAdmin = owner_id => (user, meta) => _owner(owner_id) || _facStaffAdmin(user)

const _ownerOrLabWorkerAdmin = owner_id => (user, meta) => _owner(owner_id) || _labWorkerAdmin(user)

const _ownerOrLabWorkerOrFacStaffAdmin = owner_id => (user, meta) => _owner(owner_id) || _labWorker(user) || _facStaffAdmin(user)

const permissions = {
  agreements: {
    GET: _anybody,
    GET_ID: _facStaffAdmin,
    POST: _facStaffAdmin,
  },
  barcodes: {
    POST: _labWorkerAdmin,
  },
  categories: {
    POST: _labWorkerAdmin,
  },
  contacts: {
    GET_ID: _facStaffAdmin,
    GET_ME: _anybody,
    POST: _ownerOrLabWorkerOrFacStaffAdmin('username'),
    PUT: _ownerOrLabWorkerOrFacStaffAdmin('username'),
  },
  course: {
    POST: _admin,
    POST_STUDENT: _facStaffAdmin,
  },
  enrollments: {
    POST: _ownerOrFacStaffAdmin('username'),
  },
  equipment: {
    GET_ID: _anybody,
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
