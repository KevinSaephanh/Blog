const router = require("express").Router();

router.get("/user-posts/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username });
    res.status(200).json({
      message: "User posts retrieved!",
      posts: user.posts,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
