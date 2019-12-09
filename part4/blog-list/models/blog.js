const mongoose = require('mongoose');

/* -- Schema -- */
const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
});

/* -- Model -- */
module.exports = mongoose.model('Blog', blogSchema);

