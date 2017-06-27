// EnrollmentProcess/index.js
const Enrollment = require('../shared/models/Enrollment')
const graph = require('../shared/graph')


module.exports = (context, enrollment) => {
  Enrollment.validate(enrollment)
  .then(validated => {
    var jobs = []
    jobs.push({ type: 'getOutEhasPropsInV', data: {id: validated.course, hasKey: 'is', hasValue: 'Instructor'}})
    jobs.push({ type: 'getV', data: validated.course })
    graph.batch(jobs, (error, results) => {
      if (results[0][0].properties.notifyEnrollments[0].value === 'Email') {
        const instructorEmail = results[0][0].properties.email[0].value
        const courseName = results[1][0].properties.code[0].value
        context.bindings.outQueue = {
          to: instructorEmail,
          subject: 'New Course Enrollment',
          body: "You have student(s) to requesting enrollment in you Mediagarden Course: " + courseName,
        }
        context.done()
      } else {
        context.done()
      }
    })
  })
  .catch(error => context.done(error))
}
