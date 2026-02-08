import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const protect = async (req, res, next) => {
  let token;

  // Check if the "Authorization" header exists and starts with "Bearer"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the Admin in the database pero hindi kasama password
      req.admin = await Admin.findById(decoded.id).select("-password");

      // If found, let them proceed to the route
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  // If no token was found at all
  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

export { protect };