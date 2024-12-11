const express = require('express');
const { createForm, getForms } = require('../controllers/formController');
const router = express.Router();

router.post('/', createForm);
router.get('/', getForms);

module.exports = router;
