const { Form } = require('../models');

const createForm = async (req, res) => {
  try {
    const form = await Form.create(req.body);
    res.status(201).json(form);
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

module.exports = { createForm, getForms };
