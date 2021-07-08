const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hash password for user
    const hash = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hash,
    });

    // Check if user already exists
    const userFound = await User.findOne({ email, username });
    if (userFound) {
      return res.status(401).json({
        message: "User already exists",
      });
    }

    // Save new user
    const result = user.save();
    res.status(201).json({
      message: "User created!",
      result,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const foundUser = await User.findOne({ username });
    const user = foundUser;
    await bcrypt.compare(password, user.password);

    // Create and sign token
    const token = jwt.sign(
      {
        username: user.username,
        photo: user.photo,
        userId: user._id,
      },
      process.env.TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({
      token: token,
      expiresIn: 3600,
    });
  } catch (error) {
    res.status(401).json({ error });
  }
});

module.exports = router;
