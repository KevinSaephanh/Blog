const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    min: 2,
    max: 25,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  thumbnail: {
    type: Schema.Types.ObjectId,
    ref: "Photo",
  },
  description: {
    type: String,
    required: true,
  },
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
  sections: [
    {
      type: Schema.Types.ObjectId,
      ref: "Section",
    },
  ],
});

module.exports = Post = mongoose.model("Post", PostSchema);
