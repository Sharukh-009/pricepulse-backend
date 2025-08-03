const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS // Use App Password, NOT your actual password
  }
});

const sendNotification = async (email, url, price) => {
  await transporter.sendMail({
   from: `Pricepulse <${process.env.EMAIL_USER}>`,

    to: email,
    subject: '🔔 Price Dropped!',
    text: `The price dropped to ₹${price} for your tracked item: ${url}`,
  });
};

module.exports = sendNotification;
