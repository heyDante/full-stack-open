const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('../app');
const User = require('../models/user');

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  const newUser = new User({
    username: 'jswift',
    name: 'Jonathan Swift'
  });
  await newUser.save();
});

describe('a user', () => {
  test('cannot be created if username is not provided', async () => {
    const newUser = {
      username: '',
      name: 'Richard Jones',
      password: 'secret'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  }, 10000);

  test('cannot be created if username length is less than 3 characters', async () => {
    const newUser = {
      username: 'rj',
      name: 'Richard Jones',
      password: 'secret'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });

  test('cannot be created if username is not unique', async () => {
    const newUser = {
      username: 'jswift',
      name: 'Richard Jones',
      password: 'secret'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });

  test('cannot be created if password is not provided', async () => {
    const newUser = {
      username: 'rjones',
      name: 'Richard Jones',
      password: ''
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });

  test('cannot be created if password is less than 3 characters', async () => {
    const newUser = {
      username: 'rjones',
      name: 'Richard Jones',
      password: 'se'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });
});

afterAll(() => {
  mongoose.connection.close();
});