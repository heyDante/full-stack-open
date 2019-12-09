const express = require('express');
const Blog = require('../models/blog');

const blogRouter = express.Router();

blogRouter.get('/', (req, res) => {
  Blog
    .find({})
    .then( (blogs) => {
      res.json(blogs);
    });
});

blogRouter.post('/', (req, res) => {

  const blog = new Blog(req.body); // create a new object from the model

  blog
    .save()
    .then( (result) => {
      res.status(201).json(result);
    });
});


module.exports = blogRouter;
