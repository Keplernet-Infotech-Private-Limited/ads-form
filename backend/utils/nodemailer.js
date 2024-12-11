const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL, 
    pass: process.env.PASSWORD 
  },
  // debug: true, // Show debug output
  // logger: true // Log information
});

module.exports = transporter;
