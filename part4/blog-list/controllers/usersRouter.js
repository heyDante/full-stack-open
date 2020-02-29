const usersRouter = require('express').Router();
const brcypt = require('bcrypt');

const User = require('../models/user');

usersRouter.get('/', async (req, res) => {
  const users = await User.find({})
    .populate('blogs', { url: 1, title: 1, author: 1 });
  res.send(users);
});

usersRouter.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    const password = body.password;

    if (password === '') {
      res.status(400).json({
        error: 'Password cannot be empty'
      });
      return;
    } else if (password.length < 3) {
      res.status(400).json({
        error: 'Password should be atleast 3 characters long'
      });
      return;
    }

    const saltRounds = 10;

    const passwordHash = await brcypt.hash(password, saltRounds);

    const newUser = User({
      username: body.username,
      name: body.name,
      passwordHash
    });

    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }

});

module.exports = usersRouter;