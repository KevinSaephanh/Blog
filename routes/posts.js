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

router.post("", multer({ storage }).single("image"), (req, res) => {
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

  post
    .save()
    .then((savedPost) => {
      // If post saved successfully, return post details
      res.status(201).json({
        message: "Post added successfully",
        post: {
          ...savedPost,
          id: savedPost._id,
        },
      });
    })
    .catch((err) => {
      res.status(400).json({ message: "Error adding post" });
    });
});

router.get("", (req, res) => {
  Post.find()
    .then((posts) =>
      res.status(200).json({ message: "Posts retrieved" }, posts)
    )
    .catch((err) => res.status(400).json({ message: "No posts found!" }));
});

router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((post) => res.status(200).json({ message: "Post retrieved!" }, post))
    .catch((err) => res.status(400).json({ message: "Post not found!" }));
});

router.put("/:id", (req, res) => {
  Post.findByIdAndUpdate(req.params.id, req.body.post)
    .then((post) =>
      res.status(200).json({ message: "Post successfully updated!" }, post)
    )
    .catch((err) => res.status(400).json({ message: "Post not found!" }));
});

router.delete("/:id", authenticate, (req, res) => {
  Post.deleteOne({ _id: req.params.id, creator: req.userData.userId })
    .then(() => res.json({ message: "Post delete successful!" }))
    .catch((err) => res.status(400).json({ message: "Error deleting post" }));
});

module.exports = router;
