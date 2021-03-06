const express = require('express');
const jwt = require('jsonwebtoken');

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

  const token = req.token;

  try {
    const body = req.body;

    const decodedToken = jwt.verify(token, process.env.SECRET);

    if(!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid'});
    }

    const user = await User.findById(decodedToken.id);

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
  const blogId = req.params.id;
  try {
    const token = req.token;
    const decodedToken = jwt.verify(token, process.env.SECRET);

    const blogToDelete = await Blog.findById(blogId);

    const allowedToDelete = decodedToken.id.toString() === blogToDelete.user.toString();

    if (!token || !allowedToDelete) {
      return res.status(401).json({
        error: 'Invalid token or Blog not created by user who wants to delete.'
      });
    }

    await Blog.findByIdAndDelete(blogId);
    res.status(204).end(); 
  } catch (error) {
    next(error);
  }
});


module.exports = blogsRouter;
