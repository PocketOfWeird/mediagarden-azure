// SendEmail/index.js
//const sg = require('sendgrid')(process.env.SENDGRID_API_KEY)
//const helper = require('sendgrid').mail
const nodemailer = require('nodemailer')


module.exports = (context, email) => {

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
      host: process.env.smtp_server,
      port: process.env.smtp_server_port,
  })

  // setup email data with unicode symbols
  const mailOptions = {
      from: process.env.FROM_EMAIL, // sender address
      to: email.to, // list of receivers
      subject: 'Mediagarden: ' + email.subject, // Subject line
      text: email.body, // plain text body
  }

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (!error) {
        context.log('Success', info.messageId, info.response)
        context.done()
      } else {
        context.done(error)
      }
  })
}
