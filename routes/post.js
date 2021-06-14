const router = require("express").Router();
const Post = require("../models/Post");
const authenticate = require("../middleware/authentication");

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then((post) => {
    Post.findById(req.params.id)
      .then((post) => res.json(post))
      .catch((err) => res.status(400).json("Post not found!"));
  });
});

router.get("/my-posts", authenticate, (req, res, next) => {
  Post.find({ creator: req.userData.userId })
    .then((posts) => {
      if (posts) {
        res.status(200).json({
          message: "Posts fetched successfully!",
          posts,
        });
      }
    })
    .catch((err) => {
      res.status(404).json({ message: "Post not found!" });
    });
});

router.post("", authenticate, (req, res, next) => {
  const post = new Post(req.body.post);
  post
    .save()
    .then((savedPost) => {
      // If post saved successfully, return post details
      if (savedPost) {
        res.status(201).json({
          message: "Post added successfully",
          post: {
            ...savedPost,
            id: savedPost._id,
          },
        });
      }
    })
    .catch((err) => {
      res.status(400).json({ message: "Error adding post" });
    });
});

router.delete("/:id", authenticate, (req, res, next) => {
  Post.deleteOne({ _id: req.params.id, creator: req.userData.userId })
    .then(() => res.json("Post delete successful!"))
    .catch((err) => res.status(400).json("Error deleting post"));
});

module.exports = router;
