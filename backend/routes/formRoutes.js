const express = require('express');
const { createForm, getForms, verifyOtp } = require('../controllers/formController');
const router = express.Router();

router.post('/', createForm);
router.post('/verify-otp', verifyOtp); // New route for OTP verification
router.get('/', getForms);

module.exports = router;
