import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`👉 Request received: ${req.method} ${req.url}`);
  next();
});

app.use("/api", adminRoutes);
app.use("/api", menuRoutes);

app.get("/", (req, res) => {
  console.log("Browser route successful.");
  res.send("Welcome dito");
});

export default app;
