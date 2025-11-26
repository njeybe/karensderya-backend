import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("api/admin", adminRoutes);

app.get("/", (req, res) => {
  console.log("Browser route successful.");
  res.send("Welcome dito");
});

export default app;
