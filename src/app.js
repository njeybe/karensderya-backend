import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";

export const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  console.log("Browser route successful.");
  res.send("Welcome dito");
});
