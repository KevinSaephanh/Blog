const router = require("express").Router();
const Category = require("../models/Category");

router.get("", (req, res) => {
  Category.find()
    .then((categories) => {
      res.status(200).json({
        message: "Categories fetched successfully",
        categories,
      });
    })
    .catch((err) => {
      res.status(404).json({ message: "Categories not found!" });
    });
});

router.post("", (req, res) => {
  const category = new Category({
    title: req.body.title,
  });
  category
    .save()
    .then((savedCategory) => {
      res.status(201).json({ message: "Category added successfully" });
    })
    .catch((err) => {
      res.status(400).json({ message: "Error adding category" });
    });
});

module.exports = router;
