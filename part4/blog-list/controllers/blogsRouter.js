const express = require('express');
const Blog = require('../models/blog');
const User = require('../models/user');

const blogsRouter = express.Router();

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 });
  res.json(blogs.map((blog) => blog.toJSON()));
});


/* -- POST method -- */
blogsRouter.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    const userId = body.userId;
    const user = await User.findById(userId);

    const blog = new Blog({ // create a new object from the model
      title: body.title,
      author: body.author || '',
      url: body.url,
      likes: body.likes,
      user: user._id
    });

    const savedBlog = await blog.save();

    /* -- Saving the saved blogs' id to the user,
    It's an array of object so we are concating -- */
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    res.status(201).json(savedBlog); 
  } catch (error) {
    next(error);
  }
});

/* -- PUT method -- */
blogsRouter.put('/:id', async (req, res, next) => {
  const body = req.body;
  const updatedBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  };
  
  try {
    const returnedUpdatedBlog = await Blog.findByIdAndUpdate(req.params.id, updatedBlog, { new: true });
    res.json(returnedUpdatedBlog.toJSON());
  } catch (error) {
    next(error);
  }
});

/* -- DELETE method -- */
blogsRouter.delete('/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    await Blog.findByIdAndDelete(id);
    res.status(204).end(); 
  } catch (error) {
    next(error);
  }
});


module.exports = blogsRouter;
