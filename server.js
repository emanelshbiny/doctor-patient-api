const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
const PORT = process.env.PORT || 3000;

// 🔐 Mock API Key & Iframe ID
const API_KEY = "DEMO_API_KEY";
const INTEGRATION_ID = "DEMO_INTEGRATION_ID";
const IFRAME_ID = "123456";

app.use(cors());
app.use(bodyParser.json());

let auth_token = "demo_token";

app.post("/auth/token", async (req, res) => {
  res.json({ success: true, token: auth_token });
});

app.post("/order/create", async (req, res) => {
  const { amount_cents } = req.body;
  res.json({ success: true, order_id: "demo_order_id" });
});

app.post("/payment/key", async (req, res) => {
  res.json({ success: true, payment_token: "demo_payment_token" });
});

app.post("/payment/url", async (req, res) => {
  const { payment_token } = req.body;
  const payment_url = `https://accept.paymob.com/api/acceptance/iframes/${IFRAME_ID}?payment_token=${payment_token}`;
  res.json({ success: true, url: payment_url });
});

app.listen(PORT, () => {
  console.log(`Paymob Demo API running on port ${PORT}`);
});
