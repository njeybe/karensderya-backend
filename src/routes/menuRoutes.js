import express from "express";
import { addMenu } from "../controller/menuController.js";
import upload from "../utils/multerConfig.js";

const router = express.Router();

router.post("/", upload.single("image"), addMenu);

export default router;
