// ReservationPost/index.js
const token = require('../shared/auth/token')
const graph = require('../shared/graph')
const action_types = require('../shared/helpers/action_types')
const Reservation = require('../shared/models/Reservation')
const authenticated = require('../shared/auth')
const { currentSemester } = require('../shared/helpers/dates')
const { sendData, sendError } = require('../shared/helpers')

module.exports = function (context, req) {
  token.verify(req)
  .then(user => {
    if (authenticated(user).allowedTo('POST', 'reservations')) {
      const action = req.body
      if (action.type === action_types.RESERVATION_POST) {
        var data = action.payload
        data.reservation.semester = data.reservation.semester || currentSemester()
        data.reservation.partition_key = data.reservation.semester
        data.reservation.uploaded_by = user.id,
        data.reservation.last_updated_by = user.id


        Reservation.validate(data)
        .then(reservation => {
          const reservationProps = reservation.reservation
          const equipmentIds = reservation.equipment
          const kitIds = reservation.kits

          var jobs = []
          jobs.push({ type: 'addVertex', label:'reservation', data: reservationProps })
          jobs.push({ type: 'addEdge', label: 'hasReservation', data: {from: reservationProps.owner, to: reservationProps.id}})
          for (var i in equipmentIds) {
            jobs.push({ type: 'addEdge', label:'inReservation', data: {from: reservationProps.id, to: equipmentIds[i]}})
          }
          for (var i in kitIds) {
            jobs.push({ type: 'addEdge', label: 'inReservation', data: {from: reservationProps.id, to: kitIds[i]}})
          }

          graph.batch(jobs, (error, results) => {
            if (!error) {
              sendData(reservation, context, 201)
            } else {
              sendError(error, context)
            }
          })
        })
        .catch(error => sendError(error, context, 400))
      } else {
        sendError('Invalid action for Reservation Post', context, 400)
      }
    } else {
      sendError('Invalid permissions for Reservation Post', context, 403)
    }
  })
  .catch(error => sendError(error, context, 401))
}
