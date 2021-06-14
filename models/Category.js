const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  title: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    trim: true,
  },
});

module.exports = Category = mongoose.model("Category", CategorySchema);
