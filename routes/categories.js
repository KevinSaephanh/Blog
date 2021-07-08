const router = require("express").Router();
const Category = require("../models/Category");

router.get("", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      message: "Categories fetched successfully",
      categories,
    });
  } catch (error) {
    res.status(404).json({ message: "Categories not found!" });
  }
});

router.post("", async (req, res) => {
  try {
    const category = new Category({
      title: req.body.title,
    });
    await category.save();
    res.status(201).json({ message: "Category added successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error adding category" });
  }
  const category = new Category({
    title: req.body.title,
  });
});

module.exports = router;
