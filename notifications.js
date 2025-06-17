const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

router.post('/', async (req, res) => {
  try {
    const { userId, message } = req.body;
    const notification = new Notification({ userId, message });
    await notification.save();
    res.status(201).json(notification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/user/:id', async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.params.id });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;