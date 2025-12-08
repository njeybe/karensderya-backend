import jwt from "jsonwebtoken";

const generateToken = (id) => {
  // Make sure you have JWT_SECRET in your .env file, or use a fallback string here
  return jwt.sign({ id }, process.env.JWT_SECRET || "fallback_secret_key", {
    expiresIn: "30d",
  });
};

export default generateToken;