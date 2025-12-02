// app.js INITIALIZATION OF EXPRESS
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import adminController from "./controller/adminController.js";
import menuController from "./controller/menuController.js";
import orderController from "./controller/orderController.js";

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

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
