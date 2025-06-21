const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Test Route
app.get('/', (req, res) => {
  res.send('API is working ✅');
});

// Your other API routes go here
// For example:
// app.post('/api/appointments', yourHandlerFunction);

// Listen on correct PORT
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Paymob Demo API running on port ${PORT}`);
});
