import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true
    },

    password: {
      type: String,
      required: true
    },

    // Sa user ay naka default ang User page automatic di magkakaroon access ang user sa admin
    role: {
      type: String,
      enum: ["user, admin"],
      default: "user",
    }
  },
  {
    timestamps: true;
  }

);

