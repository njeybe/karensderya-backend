import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import adminController from "./controller/adminController.js";
import menuController from "./controller/menuController.js";
import orderController from "./controller/orderController.js";
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import mongoSanitize from 'express-mongo-sanitize';

const app = express();

app.use(helmet());

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP, please try again in an hour!"
});

app.use("/api", limiter);

connectDB();

app.use(express.json({ limit: "10kb"}));
app.use(express.urlencoded({extended: true, limit: "10kb"}));

app.use(mongoSanitize());

app.use(hpp());
app.use(cors());

app.use((req, res, next) => {
  console.log(`👉 Request received: ${req.method} ${req.url}`);
  next();
});

app.use("/api/auth", adminController);
app.use("/api/menu", menuController);
app.use("/api/orders", orderController);

app.get("/", (req, res) => {
  console.log("Browser route successful.");
  res.send("Welcome dito");
});

export default app;
