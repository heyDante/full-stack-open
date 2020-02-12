const mongoose = require('mongoose');

/* -- Schema -- */
const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
});

/* -- Modifying virtuals in Mongoose -- */
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

/* -- Model -- */
module.exports = mongoose.model('Blog', blogSchema);

