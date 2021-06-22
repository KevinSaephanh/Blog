const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Custom type used for posts
// Contains picture and credit for artist/website
const PictureSchema = new Schema({
  pic: {
    type: String,
  },
  creator: {
    type: String,
  },
  creatorLink: {
    type: String,
  },
  website: {
    type: String,
  },
  websiteLink: {
    type: String,
  },
});

module.exports = Picture = mongoose.model("Picture", PictureSchema);
