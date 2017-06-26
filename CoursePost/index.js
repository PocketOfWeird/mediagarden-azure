// CoursePost/index.js
const token = require('../shared/auth/token')
const graph = require('../shared/graph')
const action_types = require('../shared/helpers/action_types')
const Course = require('../shared/models/Course')
const authenticated = require('../shared/auth')
const { currentSemester } = require('../shared/helpers/dates')
const { sendData, sendError, removeProps } = require('../shared/helpers')

module.exports = function (context, req) {
  token.verify(req)
  .then(user => {
    if (authenticated(user).allowedTo('POST', 'course')) {
      const action = req.body
      if (action.type === action_types.COURSE_POST) {
        var data = action.payload
        data.semester = data.semester || currentSemester()
        data.partition_key = data.semester
        data.uploaded_by = user.id
        data.last_updated_by = user.id


        Course.validate(data)
        .then(course => {
          const courseProps = removeProps(['students']).from(course)
          var jobs = []
          jobs.push({ type: 'addVertex', label: 'course', data: courseProps })
          jobs.push({ type: 'addEdge', label: 'inCourse', data: {from: course.id, to: course.instructor, props: {is: 'Instructor', enrolled: Date.now()}}})
          for (var i in course.students) {
            jobs.push({ type: 'addEdge', label: 'inCourse', data: {from: course.id, to: course.students[i], props: {is: 'Student', enrolled: Date.now()}}})
          }
          console.log(jobs)
          graph.batch(jobs, (error, results) => {
            if (!error) {
              sendData(course, context, 201)
            } else {
              sendError(error, context)
            }
          })
        })
        .catch(error => sendError(error, context, 400))
      } else {
        sendError('Invalid action for Course Post', context, 400)
      }
    } else {
      sendError('Invalid permissions for Course Post', context, 403)
    }
  })
  .catch(error => sendError(error, context, 401))
}
