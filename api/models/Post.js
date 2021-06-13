const mongoose = require("mongoose");
const Section = require("./Section");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  thumbnail: {
    type: String,
  },
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
  sections: [
    {
      type: Section,
      required: true,
    },
  ],
});

module.exports = Post = mongoose.model("Post", PostSchema);
