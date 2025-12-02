import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// create new order
router.post("/", async (req, res) => {
  try {
    const { items, totalAmount } = req.body;

    const newOrder = new Order({
      // customerName,
      items, 
      totalAmount,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// get all orders (ADMIN Logic)
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// update status (Pending -> completed)
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.status(201).json(updatedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
