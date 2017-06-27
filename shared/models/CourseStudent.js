// shared/models/CourseStudent.js
const modeler = require('./modeler')


const CourseStudent = modeler.model({
  course: { type: 'uuid', required: true },
  students: { type: 'array', required: true, values: {
    type: 'uuid'
  }},
})

module.exports = CourseStudent
