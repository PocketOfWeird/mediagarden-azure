// CourseStudentPost/index.js
const token = require('../shared/auth/token')
const graph = require('../shared/graph')
const action_types = require('../shared/helpers/action_types')
const CourseStudent = require('../shared/models/CourseStudent')
const authenticated = require('../shared/auth')
const { currentSemester } = require('../shared/helpers/dates')
const { sendData, sendError, removeProps } = require('../shared/helpers')

module.exports = function (context, req) {
  token.verify(req)
  .then(user => {
    if (authenticated(user).allowedTo('POST_STUDENT', 'course')) {
      const action = req.body
      if (action.type === action_types.COURSE_STUDENT_POST) {
        var data = {
          course: req.params.id,
          students: action.payload
        }


        CourseStudent.validate(data)
        .then(courseStudent => {
          const courseId = courseStudent.course
          const students = courseStudent.students
          var jobs = []
          for (var i in students) {
            jobs.push({ type: 'addEdge', label: 'inCourse', data: {from: courseId, to: students[i], props: {is: 'Student', enrolled: Date.now()}}})
          }
          graph.batch(jobs, (error, results) => {
            if (!error) {
              sendData(courseStudent, context, 201)
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
