const express = require('express');
const Blog = require('../models/blog');

const blogRouter = express.Router();

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs.map((blog) => blog.toJSON()));
});


/* -- POST method -- */
blogRouter.post('/', async (req, res, next) => {

  const blog = new Blog(req.body); // create a new object from the model
  
  try {
    const savedBlog = await blog.save();
    res.status(201).json(savedBlog); 
  } catch (error) {
    next(error);
  }
});

/* -- DELETE method -- */
blogRouter.delete('/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    await Blog.findByIdAndDelete(id);
    res.status(204).end(); 
  } catch (error) {
    next(error);
  }
});


module.exports = blogRouter;
