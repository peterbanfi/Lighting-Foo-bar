const nodeMailer = require('nodemailer');
const mailRouter = require('express').Router();

mailRouter.post('/send', (req, res, next) => {
  const transporter = nodeMailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'szeszpress@gmail.com',
      pass: 'szeszpress2018',
    }
  });
  const mailOptions = {
    from: req.body.from,
    to: 'szeszpress@gmail.com',
    subject: req.body.subject,
    text: req.body.text,
    html: `<p>${req.body.text}
      <br>
      <strong>From: ${req.body.from}</strong>
      </p>`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
    res.render('index');
  });
});

module.exports = mailRouter;