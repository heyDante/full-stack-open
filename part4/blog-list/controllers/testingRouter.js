const testingRouter = require('express').Router();

const Blog = require('../models/blog');
const User = require('../models/user');

/* -- Defining one single route to reset the database for testing -- */
testingRouter.post('/reset', async (req, res) => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  res.status(204).end();
});

module.exports = testingRouter;