const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

router.post('/', async (req, res) => {
  try {
    const { patientId, doctorId, date } = req.body;
    const appointment = new Appointment({ patientId, doctorId, date });
    await appointment.save();
    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;