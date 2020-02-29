const usersRouter = require('express').Router();
const brcypt = require('bcrypt');

const User = require('../models/user');

usersRouter.get('/', async (req, res) => {
  const users = await User.find({});
  res.send(users);
});

usersRouter.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    const password = body.password;
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