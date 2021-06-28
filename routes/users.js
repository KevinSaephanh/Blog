const router = require("express").Router();

router.get("/user-posts/:username", (req, res) => {
  const { username } = req.params;
  User.findOne({ username })
    .then((user) => {
      res.status(200).json({
        message: "User posts retrieved!",
        posts: user.posts,
      });
    })
    .catch((err) => {
      res.status(400).json({
        error: err,
      });
    });
});

module.exports = router;
