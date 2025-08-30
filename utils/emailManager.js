const nodemailer = require('nodemailer');

const emailManager = async (to, subject,  html, ) => {
  const transporter = nodemailer.createTransport({
    host: process.env.mail_host,
    port: process.env.mail_port,
    auth: {
      user: process.env.mail_email,
      pass: process.env.mail_pass,
    },
  });


  try {
    await transporter.sendMail({
      to,
      from: process.env.mail_company,
      subject,
      html,
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error(`Failed to send email to ${to}: ${error.message}`);
  }
};

module.exports = emailManager;
