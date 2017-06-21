// shared/auth/roleTable.js
const table = require('../table')
const { getIt } = require('../helpers/fetchers')
const { currentSemester } = require('../helpers/dates')


const _roles = ['Faculty', 'Staff', 'Student', 'Admin', 'Labworker']

const _generateRolesFromResult = roleTableResult => {
  var roles = {}
  for (i in _roles) {
    var role = _roles[i]
    if (roleTableResult[role]._) roles[role] = true
  }
  return roles
}

const _generateRolesFromUser = user => {
  var roles = {}
  if (user.attributes.isFaculty) roles.Faculty = true
  if (user.attributes.isStaff) roles.Staff = true
  if (user.attributes.isStudent) roles.Student = true
  return roles
}

const _roleEntity = (user, roles, semester) => ({
  PartitionKey: semester,
  RowKey: user.user,
  Faculty: roles.Faculty ? true : false,
  Staff: roles.Staff ? true : false,
  Student: roles.Student ? true : false,
  Admin: roles.Admin ? true : false,
  Labworker: roles.Labworker ? true : false,
})

const getRoles = (user) => new Promise((resolve, reject) => {
  const semester = currentSemester()
  table.retrieveEntity('Role', semester, user.user, (error, result) => {
    if (!error) {
      resolve(_generateRolesFromResult(result))
    } else {
      if (error.statusCode === 404) {
        const roles = _generateRolesFromUser(user)
        table.insertEntity('Role', _roleEntity(user, roles, semester), (err, result) => {
          if (!err) {
            resolve(roles)
          } else {
            reject(err)
          }
        })
      } else {
        reject(error)
      }
    }
  })
})

const hasRole = (roleGroup, user) => {
  switch (roleGroup) {
    case 'any':
      return user.roles.Student || user.roles.Faculty || user.roles.Staff || user.roles.Admin || user.roles.Labworker
    case 'facstaffadmin':
      return user.roles.Faculty || user.roles.Staff || user.roles.Admin
    case 'labworkeradmin':
      return user.roles.Labworker || user.roles.Admin
    default:
      return false
  }
}

module.exports = {
  getRoles,
  hasRole
}
