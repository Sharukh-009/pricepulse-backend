const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mohammedsharukhp@gmail.com', // 🔁 Replace with your Gmail
    pass: 'uhro zywc snvw mvpf'     // 🔁 Replace with Gmail App Password (not your login)
  },
  port: 587,
  secure: false
});

const mailOptions = {
  from: 'mohammedsharukhp@gmail.com',
  to: 'mohammedsharukhp@gmail.com',
  subject: 'Test Email from Pricepulse',
  text: '🎯 This is a test email from your Node.js app!'
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('❌ Email send failed:', error.message);
  } else {
    console.log('✅ Email sent:', info.response);
  }
});
