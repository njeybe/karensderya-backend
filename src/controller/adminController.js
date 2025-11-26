import Admin from "../models/Admin.js";
import generateToken from "../utils/generateToken.js";

const authAdmin = async (req, res) => {
  const { username, password } = req.body;

  const admin = await Admin.findOne({ username });
  if (admin && (await admin.matchPassword(password))) {
    res.json({
      _id: admin._id,
      username: admin.username,
      token: generateToken(admin._id),
      message: "Login successful",
    });
  }
};

export default authAdmin;
