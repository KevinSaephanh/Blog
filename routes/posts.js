const router = require("express").Router();
const Post = require("../models/Post");
const authenticate = require("../middleware/authentication");

router.post("", authenticate, (req, res, next) => {
  const post = new Post(req.body.post);
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

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id)
    .then((post) => res.status(200).json(post))
    .catch((err) => res.status(400).json("Post not found!"));
});

router.put("/:id", (req, res, next) => {
  Post.findByIdAndUpdate(req.params.id, req.body.post)
    .then((post) => res.status(200).json(post))
    .catch((err) => res.status(400).json("Post not found!"));
});

router.delete("/:id", authenticate, (req, res, next) => {
  Post.deleteOne({ _id: req.params.id, creator: req.userData.userId })
    .then(() => res.json("Post delete successful!"))
    .catch((err) => res.status(400).json("Error deleting post"));
});

module.exports = router;
