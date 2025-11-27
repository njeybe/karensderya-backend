import Admin from "../models/Admin.js";
import generateToken from "../utils/generateToken.js";

const authAdmin = async (req, res) => {
  console.log("Data received from Postman", req.body);
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (admin && (await admin.matchPassword(password))) {
      res.json({
        _id: admin._id,
        username: admin.username,
        token: generateToken(admin._id),
        message: "Login successful",
      });
    } else {
      res.status(404).json({ message: "Invalid username or password" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default authAdmin;
