import express from "express";
import authAdmin from "../controller/adminController.js";

const router = express.Router();

router.post("/login", authAdmin);

export default router;
