const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

router.post('/', async (req, res) => {
  try {
    const { doctorId, patientId, rating, comment } = req.body;
    const review = new Review({ doctorId, patientId, rating, comment });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/doctor/:id', async (req, res) => {
  try {
    const reviews = await Review.find({ doctorId: req.params.id });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;