import Menu from "../models/Menu.js";

export const getMenus = async (req, res) => {
  try {
    const menus = (await Menu.find()).sort({ createdAt: -1 });
    res.status(200).json(menus);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addMenu = async (req, res) => {
  try {
    console.log("Data received from Postman", req.body);
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
    res.status(400).json({ message: err.message });
  }
};
