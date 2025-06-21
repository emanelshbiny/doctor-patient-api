const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const PORT = 3000;

// Replace these with your own sandbox credentials from Paymob dashboard
const API_KEY = "ZXlKaGJHY2lPaUpJVXpJMU5pSXNJbXRwWkNJNklqZ3dNakl3TURrMU5ETXdNVEF4TkRrM0lpd2laWGh3SWpveE5qYzVNVFF3T0RBc0ltbHpjeUk2SW1saGRDSTZNVFl3TVRZeE1UQTFNRE0zTENKMGVYQmxJam9pY0hKdlptbHNaV05wY3lJc0ltVjRjQ0k2TVRZek5EVTJOamd3TmpZc0ltbHpjeUk2SW1saGRDSTZNVFl3TVRZeE1UQTFNRE0zTENKMGVYQmxJam9pY0hKdlptbHNaV05wY3lJc0ltVjRjQ0k2TVRZek5EVTJOamd3TmpZc0ltbHpjeUk2SW1saGRDSTZNVFl3TVRZeE1UQTFNRE0zTENKMGVYQmxJam9pY0hKdlptbHNaV05wY3lJc0ltVjRjQ0k2TVRZek5EVTJOamd3TmpZc0ltbHpjeUk2SW1saGRDSTZNVFl3TVRZeE1UQTFNRE0z";
const INTEGRATION_ID = "4234857";
const IFRAME_ID = "797238";

app.use(cors());
app.use(bodyParser.json());

let auth_token = null;

app.post("/auth/token", async (req, res) => {
  try {
    const response = await axios.post("https://accept.paymob.com/api/auth/tokens", {
      api_key: API_KEY
    });
    auth_token = response.data.token;
    res.json({ success: true, token: auth_token });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post("/order/create", async (req, res) => {
  try {
    const { amount_cents } = req.body;
    const response = await axios.post("https://accept.paymob.com/api/ecommerce/orders", {
      auth_token,
      delivery_needed: "false",
      amount_cents,
      currency: "EGP",
      items: []
    });
    res.json({ success: true, order_id: response.data.id });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post("/payment/key", async (req, res) => {
  try {
    const { order_id, amount_cents } = req.body;
    const billingData = {
      apartment: "NA",
      email: "test@example.com",
      floor: "NA",
      first_name: "Eman",
      street: "NA",
      building: "NA",
      phone_number: "01234567890",
      shipping_method: "NA",
      postal_code: "NA",
      city: "Cairo",
      country: "EG",
      last_name: "Elshbiny",
      state: "Cairo"
    };

    const response = await axios.post("https://accept.paymob.com/api/acceptance/payment_keys", {
      auth_token,
      amount_cents,
      expiration: 3600,
      order_id,
      billing_data: billingData,
      currency: "EGP",
      integration_id: INTEGRATION_ID
    });

    res.json({ success: true, payment_token: response.data.token });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post("/payment/url", async (req, res) => {
  const { payment_token } = req.body;
  const payment_url = `https://accept.paymob.com/api/acceptance/iframes/${IFRAME_ID}?payment_token=${payment_token}`;
  res.json({ success: true, url: payment_url });
});

app.listen(PORT, () => {
  console.log(`Paymob Sandbox API running at http://localhost:${PORT}`);
});