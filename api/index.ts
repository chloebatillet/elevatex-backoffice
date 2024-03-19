import dotenv from "dotenv";
import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import Stripe from "stripe";
import { getUsersTable } from "./drizzle/simple-connect";
import { seed } from "./drizzle/seed";

dotenv.config();

const app = express();
const PORT = 3001;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

seed();

app.get("/", async (_, res: Response) => {
  const result = await getUsersTable();
  console.log(result);

  res.send("<h1>Helloooooo</h1>");
});

app.get("/config", async (_, res: Response) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLIC_KEY,
  });
});

app.post("/create-payment-intent", async (req: Request, res: Response) => {
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
  } catch (e: any) {
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

export default app;
