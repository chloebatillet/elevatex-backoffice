require("path");
require("dotenv").config({ path: "../.env" });

const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3000;

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});

app.use(cors());
app.use(express.json());

app.get("/config", (req, res) => {
  res.send({
    blabla: "blabla",
    publishableKey: process.env.STRIPE_PUBLIC_KEY,
  });
});

app.post("/create-payment-intent", async (req, res) => {
  try {
    console.log("body: ", req.body);
    const { total } = req.body;
    const amount = total.toString().replace(".", "");

    const paymentIntent = await stripe.paymentIntents.create({
      currency: "EUR",
      amount: amount,
      automatic_payment_methods: { enabled: true },
    });

    // Send publishable key and PaymentIntent details to client
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});

app.listen(PORT, () =>
  console.log(`Node server listening at http://localhost:${PORT}`)
);

module.exports = app;
