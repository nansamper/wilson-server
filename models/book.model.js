const { Schema, model } = require("mongoose");

const bookSchema = new Schema({
  id: {
    type: Number,
  },
  name: {
    type: String,
  },
  author: {
    type: String,
  },
  description: {
    type: String,
  },
});

const book = model("books", bookSchema);
module.exports = book;
