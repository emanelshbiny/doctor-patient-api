const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: Number,
  method: String,
  date: { type: Date, default: Date.now },
  status: { type: String, default: 'paid' }
});

module.exports = mongoose.model('Payment', paymentSchema);