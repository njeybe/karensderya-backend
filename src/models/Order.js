import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    // customerName: {
    //   type: String,
    //   default: "Walk-in Customer",
    // },

    customerName: { type: String, required: true },
    contactNumber: { type: String }, // Optional
    orderType: {
      type: String,
      enum: ["Dine-in", "Takeout", "Delivery"],
      default: "Dine-in",
    },
    tableNumber: { type: String }, // For Dine-in
    address: { type: String },

    items: [
      {
        menuId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Menu",
        },
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        qty: {
          type: Number,
          required: true,
        },
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Preparing", "Ready", "Completed", "Cancelled"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
