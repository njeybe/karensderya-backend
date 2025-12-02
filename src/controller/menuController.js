import express from "express";
import Menu from "../models/Menu.js";
import upload from "../utils/multerConfig.js";
import { protect } from "../middleware/authMiddleware.js"; // 👈 IMPORT THE BOUNCER

const router = express.Router();

// --- PUBLIC ROUTE (No Bouncer) ---
// Customers need to see the menu without logging in
router.get("/", async (req, res) => {
  try {
    const menus = await Menu.find({ isArchived: false }).sort({
      createdAt: -1,
    }); // sorts the data, newest first
    res.status(200).json(menus);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// --- PROTECTED ROUTES (Bouncer Active) ---

// 1. CREATE (Only Admin)
router.post("/", protect, upload.single("image"), async (req, res) => {
  try {
    console.log("Data received from Postman", req.body); // para sa postman lang to
    const { name, price } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Please upload an image" });
    }

    const newMenu = new Menu({
      name,
      price,
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    });

    const savedMenu = await newMenu.save();
    res.status(201).json(savedMenu);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
});

// 2. UPDATE (Only Admin)
router.put("/:id", protect, upload.single("image"), async (req, res) => {
  try {
    console.log("Data received from Postman", req.body); // para sa postman lang to
    const { name, price } = req.body;

    const menuId = req.params.id;
    let updateMenu = { name, price };

    if (req.file) {
      updateMenu.image = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    const updatedMenu = await Menu.findByIdAndUpdate(menuId, updateMenu, {
      new: true,
    });

    if (!updatedMenu) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    res.status(201).json(updatedMenu);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
});

// 3. ARCHIVE (Only Admin)
router.put("/archive/:id", protect, async (req, res) => {
  try {
    const menuId = req.params.id;

    const archivedMenu = await Menu.findByIdAndUpdate(
      menuId,
      { isArchived: true },
      { new: true }
    );

    if (!archivedMenu) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res
      .status(200)
      .json({ message: "Menu deleted successfuly", item: archivedMenu });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 4. RESTORE (Only Admin)
router.put("/restore/:id", protect, async (req, res) => {
  try {
    await Menu.findByIdAndUpdate(req.params.id, { isArchived: false });
    res.status(200).json({ message: "Menu restored successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 5. GET ARCHIVED (Only Admin should see hidden items)
router.get("/archived", protect, async (req, res) => {
  try {
    const hiddenMenus = await Menu.find({ isArchived: true }).sort({
      updatedAt: -1,
    });
    res.status(200).json(hiddenMenus);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
