const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Custom type used for posts
const SectionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
  },
  body: {
    type: String,
    required: true,
  },
});

module.exports = Section = mongoose.model("Section", SectionSchema);
