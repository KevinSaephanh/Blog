const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    min: 3,
    max: 30,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    min: 5,
    max: 100,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 256,
  },
  photo: {
    type: String,
    required: true,
    default:
      "https://res.cloudinary.com/geekysrm/image/upload/v1542221619/default-user.png",
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

module.exports = User = mongoose.model("User", UserSchema);
