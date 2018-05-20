const express = require('express');

const mailRouter = express.Router();

/**
 * npm i --save nodemailer nodemailer-smtp-transport
 */
const nodemailer = require('nodemailer');


/**
 * saját email cím beállítása
 */
mailRouter.post('/contact/sendMessage', (req, res) => {
  const smtpTransport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secureConnection: false,
    port: 587,
    requiresAuth: true,
    domains: ['gmail.com', 'googlemail.com'],
    auth: {
      user: 'szeszpress@gmail.com',
      pass: 'szeszpress2018',
    },
  });

  const output = `
  <p>incoming message</p>
  <p>Email: ${req.body.email}</p>
  <p>Email: ${req.body.message}</p>
  `;

  /**
   * ahonnan és ahogy kapjuk az üzenetet, annak beállítása
   * from: a küldő email címe
   * to: ahova menjen
   * subject: tárgy
   * html: az üzenet szövege
   */
  const mailOptions = {
    from: 'sender@email.com',
    to: 'szeszpress@gmail.com',
    subject: 'sör van?',
    text: 'sok sör kell',
    html: output,
  };

  smtpTransport.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(`Error while sending mail: ${error}`);
    }
    console.log('Message sent: %s', info.messageId);

    smtpTransport.close();
  });
});

module.exports = mailRouter;
