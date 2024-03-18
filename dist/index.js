"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const stripe_1 = __importDefault(require("stripe"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = 3000;
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2023-10-16",
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", (_, res) => {
    res.send("<h1>Helloooooo</h1>");
});
app.get("/config", (_, res) => {
    res.send({
        publishableKey: process.env.STRIPE_PUBLIC_KEY,
    });
});
app.post("/create-payment-intent", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("body: ", req.body);
        const { total } = req.body;
        const amount = total.toString().replace(".", "");
        const paymentIntent = yield stripe.paymentIntents.create({
            currency: "EUR",
            amount: amount,
            automatic_payment_methods: { enabled: true },
        });
        // Send publishable key and PaymentIntent details to client
        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    }
    catch (e) {
        console.log(e);
        return res.status(400).send({
            error: {
                message: e.message,
            },
        });
    }
}));
app.listen(PORT, () => console.log(`Node server listening at http://localhost:${PORT}`));
exports.default = app;
