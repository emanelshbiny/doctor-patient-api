const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');

router.post('/', async (req, res) => {
  try {
    const { patientId, doctorId, amount, method } = req.body;
    const payment = new Payment({ patientId, doctorId, amount, method });
    await payment.save();
    res.status(201).json(payment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/user/:id', async (req, res) => {
  try {
    const payments = await Payment.find({ patientId: req.params.id });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;