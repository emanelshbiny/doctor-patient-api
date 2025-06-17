const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const appointmentRoutes = require('./routes/appointments');
const paymentRoutes = require('./routes/payments');
const reviewRoutes = require('./routes/reviews');
const notificationRoutes = require('./routes/notifications');
app.use('/api/appointments', appointmentRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/review', reviewRoutes);
app.use('/api/notification', notificationRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ Connected to MongoDB');
  app.listen(5000, () => console.log('🚀 Server running on port 5000'));
}).catch(err => console.error(err));