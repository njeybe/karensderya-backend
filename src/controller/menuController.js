import express from "express";
import Menu from "../models/Menu.js";
import upload from "../utils/multerConfig.js";

const router = express.Router();

// Nai combine ko na yung routes and controller

// Get/Read a Menu
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

// Creating a Menu
router.post("/", upload.single("image"), async (req, res) => {
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

// For updating Menu
router.put("/:id", upload.single("image"), async (req, res) => {
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

// Archive(delete) a Menu
router.put("/archive/:id", async (req, res) => {
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

// Get the archives
router.get("/archived", async (req, res) => {
  try {
    const hiddenMenus = await Menu.find({ isArchived: true }).sort({
      updatedAt: -1,
    });
    res.status(200).json(hiddenMenus);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Restore archived(deleted) menu
router.put("/restore/:id", async (req, res) => {
  try {
    await Menu.findByIdAndUpdate(req.params.id, { isArchived: false });
    res.status(200).json({ message: "Menu restored successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
