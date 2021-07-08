const router = require("express").Router();
const Post = require("../models/Post");
const authenticate = require("../middleware/authentication");
const multer = require("multer");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Check if mime type is an accepted type
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) error = null;

    cb(error, "images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  },
});

router.post("", multer({ storage }).single("image"), async (req, res) => {
  try {
    const url = req.protocol + "://" + req.get("host");
    const { title, creator, creatorProfilePic, desc, body, categories } =
      req.body;
    const post = new Post({
      title,
      thumbnail: url + "/images/" + req.file.filename,
      creator,
      creatorProfilePic,
      desc,
      body,
      categories,
    });

    const savedPost = await post.save();
    res.status(201).json({
      message: "Post added successfully",
      post: {
        ...savedPost,
        id: savedPost._id,
      },
    });
  } catch (error) {
    res.status(400).json({ message: "Error adding post" });
  }
});

router.get("", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ message: "Posts retrieved" }, posts);
  } catch (error) {
    res.status(400).json({ message: "No posts found!" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json({ message: "Post retrieved!" }, post);
  } catch (error) {
    res.status(400).json({ message: "Post not found!" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body.post);
    res.status(200).json({ message: "Post successfully updated!" }, post);
  } catch (error) {
    res.status(400).json({ message: "Post not found!" });
  }
});

router.delete("/:id", authenticate, async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.id, creator: req.userData.userId });
    res.json({ message: "Post delete successful!" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting post" });
  }
});

module.exports = router;
