const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mohammedsharukhp@gmail.com',
    pass: 'uhro zywc snvw mvpf' // Use App Password, NOT your actual password
  }
});

const sendNotification = async (email, url, price) => {
  await transporter.sendMail({
    from: 'Pricepulse <your-email@gmail.com>',
    to: email,
    subject: '🔔 Price Dropped!',
    text: `The price dropped to ₹${price} for your tracked item: ${url}`,
  });
};

module.exports = sendNotification;
