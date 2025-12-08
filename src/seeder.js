import Admin from "./models/Admin.js";

export const createDefaultAdmin = async (req, res) => {
  try {
    const adminExists = await Admin.findOne({ username: "admin" });

    if (!adminExists) {
      const admin = await Admin.create({
        username: "admin",
        password: "admin123",
        role: "admin",
      });
      console.log("Default Admin Account Created");
    }
  } catch (err) {
    console.error("Error seeding admin:", err);
  }
};
