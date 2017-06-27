// SendEmail/index.js
const nodemailer = require('nodemailer')


module.exports = (context, email) => {
  const transporter = nodemailer.createTransport({
      host: process.env.smtp_server,
      port: process.env.smtp_server_port,
  })

  const mailOptions = {
      from: process.env.FROM_EMAIL, // sender address
      to: email.to, // list of receivers
      subject: 'Mediagarden: ' + email.subject, // Subject line
      text: email.body, // plain text body
  }

  transporter.sendMail(mailOptions, (error, info) => {
      if (!error) {
        context.log('Success', info.messageId, info.response)
        context.done()
      } else {
        context.done(error)
      }
  })
}
