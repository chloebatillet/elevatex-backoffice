import dotenv from "dotenv";
import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import Stripe from "stripe";
// import { productController } from "./controllers/productController";

dotenv.config();

const app = express();
const PORT = 3001;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes -------------------------------------------
app.get("/", async (_, res: Response) => {
  res.send("<h1>Hello</h1>");
});

// Products -----------------------------------------
app.get("/products", async (_, res: Response) => {
  res.send("<h1>Products</h1>");
});
app.get("/products/:slug", async (_, res: Response) => {
  res.send("<h1>Product</h1>");
});
app.post("/add-product", async (_, res: Response) => {
  res.send("<h1>Add product</h1>");
});
app.patch("/update-product/:id", async (_, res: Response) => {
  res.send("<h1>Update product</h1>");
}); // reduced_price / size_available / stock (total size_available?)
//* route delete inutile pour le moment, seulement ne pas afficher les produits qui ont 0 stock en front

// Users --------------------------------------------
app.get("/client", async (_, res: Response) => {
  res.send("<h1>Client</h1>");
});
app.get("/clients", async (_, res: Response) => {
  res.send("<h1>Clients</h1>");
});
app.post("/new-client", async (_, res: Response) => {
  res.send("<h1>New client</h1>");
});
app.patch("/update-client", async (_, res: Response) => {
  res.send("<h1>Update client infos</h1>");
});

// Orders -------------------------------------------
app.get("/orders", async (_, res: Response) => {
  res.send("<h1>Orders</h1>");
});
app.get("/order/:id", async (_, res: Response) => {
  res.send("<h1>Order</h1>");
});
app.post("/order", async (_, res: Response) => {
  res.send("<h1>New order</h1>");
});

// Payments -----------------------------------------
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
