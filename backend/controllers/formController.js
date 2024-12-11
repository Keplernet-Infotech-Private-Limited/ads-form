const { Form } = require('../models');
const crypto = require('crypto');
const transporter = require('../utils/nodemailer');
require('dotenv').config();

// Generate OTP
const generateOtp = () => crypto.randomInt(100000, 999999).toString();

// Create Form and Send OTP
const createForm = async (req, res) => {
  try {
    const otp = generateOtp();

    const form = await Form.create({
      ...req.body,
      otp,
      isVerified: false,
    });

    // Send email with OTP
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: form.email,
      subject: 'Your OTP Verification Code',
      text: `Your OTP code is ${otp}`,
    });

    res.status(201).json({ message: 'Form created. OTP sent to email.', formId: form.id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Verify OTP
const verifyOtp = async (req, res) => {
  const { id, otp } = req.body;

  try {
    const form = await Form.findByPk(id);
    if (!form) {
      return res.status(404).json({ error: 'Form not found.' });
    }

    if (form.otp === otp) {
      form.isVerified = true;
      form.otp = null; // Clear OTP after verification
      await form.save();
      res.status(200).json({ message: 'OTP verified successfully.', form });
    } else {
      res.status(400).json({ error: 'Invalid OTP.' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getForms = async (req, res) => {
  try {
    const forms = await Form.findAll();
    res.status(200).json(forms);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { createForm, verifyOtp, getForms };
