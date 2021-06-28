const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      min: 2,
      max: 25,
      trim: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    creator: {
      type: String,
      required: true,
    },
    creatorProfilePic: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    desc: {
      type: String,
      required: true,
      min: 2,
      max: 255,
    },
    body: {
      type: Object,
      required: true,
    },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
  },
  { minimize: false }
);

module.exports = Post = mongoose.model("Post", PostSchema);
