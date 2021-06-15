const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

router.get("/user-posts/:username", (req, res, next) => {
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

router.post("/register", (req, res, next) => {
  const { username, email, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    const user = new User({
      username,
      email,
      password: hash,
    });

    User.findOne({ email })
      .then((user1) => {
        //   Return 401 if existing user is found
        if (user1) {
          return res.status(401).json({
            message: "User already exists",
          });
        }

        // Save new user
        user.save().then((result) => {
          if (!result) {
            return res.status(500).json({
              message: "Error Creating USer",
            });
          }

          res.status(201).json({
            message: "User created!",
            result: result,
          });
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  });
});

router.post("/login", (req, res, next) => {
  const { username, password } = req.body;
  let user;

  User.findOne({ username })
    .then((foundUser) => {
      // Return 401 if user is not found
      if (!foundUser) {
        return res.status(401).json({
          message: "Auth failed no such user",
        });
      }
      user = foundUser;
      return bcrypt.compare(password, user.password);
    })
    .then((result) => {
      // Return 401 if passwords do not match
      if (!result) {
        return res.status(401).json({
          message: "Auth failed incorect password",
        });
      }

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
    })
    .catch((e) => {
      console.log(e);
    });
});

module.exports = router;
