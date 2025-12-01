import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      data: Buffer,
      contentType: String,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Menu = mongoose.model("Menu", menuSchema); // Ito ang mag gagawa ng collection sa MongoDB
// yung Menu na variable magiging "menus" maging name ng collection
export default Menu;
