// shared/models/graphModels.js
const Barcode = require('./Barcode')
const Category = require('./Category')
const Contact = require('./Contact')
const Course = require('./Course')
const Equipment = require('./Equipment')
const EquipmentModel = require('./EquipmentModel')
const Fine = require('./Fine')
const Group = require('./Group')
const Kit = require('./Kit')
const Manufacturer = require('./Manufacturer')
const Project = require('./Project')
const Reservation = require('./Reservation')
const Role = require('./Role')
const Status = require('./Status')


module.exports = {
  resources: {
    barcodes: [Barcode, 'barcode', 'tag'],
    categories: [Category, 'category', 'name'],
    contacts: [Contact, 'contact', 'username'],
    courses: [Course, 'course', 'semester'],
    equipment: [Equipment, 'equipment', 'location'],
    fines: [Fine, 'fine', 'semester'],
    groups: [Group, 'group', 'semester'],
    kits: [Kit, 'kit', 'location'],
    models: [EquipmentModel, 'model', 'uploaded_by'],
    manufacturers: [Manufacturer, 'manufacturer', 'name'],
    projects: [Project, 'project', 'semester'],
    reservations: [Reservation, 'reservation', 'semester'],
    roles: [Role, 'role', 'name'],
    statuses: [Status, 'status', 'name'],
  },
  relationships: {
    barcodes: {
      equipment: 'hasBarcode',
      statuses: 'hasStatus',
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
      roles: 'hasRole',
      statuses: 'hasStatus',
    },
    courses: {
      categories: 'availableToCourse',
      contacts: 'inCourse',
      equipment: 'availableToCourse',
      groups: 'hasGroup',
      kits: 'availableToCourse',
      manufacturers: 'availableToCourse',
      models: 'availableToCourse',
      projects: 'hasProject',
      reservations: 'hasReservation',
      statuses: 'hasStatus',
    },
    equipment: {
      barcodes: 'hasBarcode',
      categories: 'inCategory',
      courses: 'availableToCourse',
      groups: 'availableToGroup',
      kits: 'inKit',
      models: 'hasModel',
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
      manufacturers: 'availableToGroup',
      models: 'availableToGroup',
      projects: 'hasProject',
      reservations: 'hasReservation',
      statuses: 'hasStatus',
    },
    kits: {
      categories: 'inCategory',
      courses: 'availableToCourse',
      equipment: 'inKit',
      groups: 'availableToGroup',
      projects: 'availableToProject',
      reservations: 'inReservation',
    },
    manufacturers: {
      courses: 'availableToCourse',
      groups: 'availableToGroup',
      models: 'hasManufacturer',
      projects: 'availableToProject',
    },
    models: {
      courses: 'availableToCourse',
      equipment: 'hasModel',
      groups: 'availableToGroup',
      manufacturers: 'hasManufacturer',
      projects: 'availableToProject',
    },
    projects: {
      categories: 'availableToProject',
      contacts: 'inProject',
      courses: 'hasProject',
      equipment: 'availableToProject',
      fines: 'hasFine',
      groups: 'hasProject',
      kits: 'availableToProject',
      manufacturers: 'availableToProject',
      models: 'availableToProject',
      reservations: 'hasReservation',
      statuses: 'hasStatus',
    },
    reservations: {
      courses: 'hasReservation',
      contacts: 'hasReservation',
      equipment: 'inReservation',
      groups: 'hasReservation',
      kits: 'inReservation',
      projects: 'hasReservation',
      statuses: 'hasStatus',
    },
    roles: {
      contacts: 'hasRole',
    },
    statuses: {
      barcodes: 'hasStatus',
      contacts: 'hasStatus',
      courses: 'hasStatus',
      groups: 'hasStatus',
      projects: 'hasStatus',
      reservations: 'hasStatus',
    },
  }
}
