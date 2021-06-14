const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    req.userData = {
      username: decodedToken.username,
      photo: decodedToken.photo,
      userId: decodedToken.userId,
    };
    next();
  } catch (err) {
    res.status(401).json({ message: "Auth failed!" });
  }
}

module.exports = authenticate;
