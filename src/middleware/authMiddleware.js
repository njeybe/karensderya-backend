import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js"; // Make sure path to Admin model is correct

const protect = async (req, res, next) => {
  let token;

  // 1. Check if the "Authorization" header exists and starts with "Bearer"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // 2. Get the token (Remove the word "Bearer " to get just the code)
      token = req.headers.authorization.split(" ")[1];

      // 3. Decode the token to find out WHO this is
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. Find the Admin in the database (excluding their password)
      req.admin = await Admin.findById(decoded.id).select("-password");

      // 5. If found, let them proceed to the route!
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
