const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Custom type used for posts
const SectionSchema = new Schema({
  title: {
    type: String,
    min: 2,
    max: 25,
    trim: true,
  },
  picture: {
    type: Schema.Types.ObjectId,
    ref: "Picture",
  },
  paragraphs: [
    {
      type: String,
      required: true,
      min: 1,
    },
  ],
});

module.exports = Section = mongoose.model("Section", SectionSchema);
