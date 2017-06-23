// shared/models/graphModels.js
const Barcode = require('./Barcode')
const Category = require('./Category')
const Contact = require('./Contact')
const Course = require('./Course')
const Equipment = require('./Equipment')
const Fine = require('./Fine')
const Group = require('./Group')
const Kit = require('./Kit')
const Project = require('./Project')
const Reservation = require('./Reservation')

module.exports = {
  resources: {
    barcodes: [Barcode, 'barcode', 'location'],
    categories: [Category, 'category', 'name'],
    contacts: [Contact, 'contact', 'username'],
    courses: [Course, 'course', 'semester'],
    equipment: [Equipment, 'equipment', 'manufacturer'],
    fines: [Fine, 'fine', 'semester'],
    groups: [Group, 'group', 'semester'],
    kits: [Kit, 'kit', 'uploaded_by'],
    projects: [Project, 'project', 'semester'],
    reservations: [Reservation, 'reservation', 'semester'],
  },
  relationships: {
    barcodes: {
      equipment: 'hasBarcode',
    },
    categories: {
      courses: 'availableToCourse',
      equipment: 'inCategory',
      groups: 'availableToGroup',
      kits: 'inCategory',
      projects: 'availableToProject',
    },
    contacts: {
      courses: 'inCourse',
      fines: 'hasFine',
      groups: 'inGroup',
      projects: 'inProject',
      reservations: 'hasReservation',
    },
    courses: {
      categories: 'availableToCourse',
      contacts: 'inCourse',
      equipment: 'availableToCourse',
      groups: 'hasGroup',
      kits: 'availableToCourse',
      projects: 'hasProject',
      reservations: 'hasReservation',
    },
    equipment: {
      barcodes: 'hasBarcode',
      categories: 'inCategory',
      courses: 'availableToCourse',
      groups: 'availableToGroup',
      kits: 'inKit',
      projects: 'availableToProject',
      reservations: 'inReservation',
    },
    fines: {
      contacts: 'hasFine',
      groups: 'hasFine',
      projects: 'hasFine',
    },
    groups: {
      categories: 'availableToGroup',
      contacts: 'inGroup',
      courses: 'hasGroup',
      equipment: 'availableToGroup',
      fines: 'hasFine',
      groups: 'availableToGroup',
      projects: 'hasProject',
      reservations: 'hasReservation',
    },
    kits: {
      categories: 'inCategory',
      courses: 'availableToCourse',
      equipment: 'inKit',
      groups: 'availableToGroup',
      projects: 'availableToProject',
      reservations: 'inReservation',
    },
    projects: {
      categories: 'availableToProject',
      contacts: 'inProject',
      courses: 'hasProject',
      equipment: 'availableToProject',
      fines: 'hasFine',
      groups: 'hasProject',
      kits: 'availableToProject',
      reservations: 'hasReservation',
    },
    reservations: {
      courses: 'hasReservation',
      contacts: 'hasReservation',
      equipment: 'inReservation',
      groups: 'hasReservation',
      kits: 'inReservation',
      projects: 'hasReservation',
    },
  },
  edgeProps: {
    hasBarcode: {
      status: {
        checked_in: 'Checked-In',
        checked_out: 'Checked-Out',
        missing: 'Missing',
        needs_repair: 'Needs-Repair',
        retired: 'Retired',
        default: 'Checked-In'
      }
    },
    inCourse: {
      agreement: 'string'
    }
  }
}
