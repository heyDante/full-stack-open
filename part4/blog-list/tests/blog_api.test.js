const supertest = require('supertest');
const mongoose = require('mongoose');

const Blog = require('../models/blog');
const app = require('../app');

const api = supertest(app);

const initialBlogs = [
  {
    title: "First Post",
    author: "Dante",
    url: "crazyne.con",
    likes: 34,
    id: "5dee52e6ffc9320f18bcac31"
  },
  {
    title: "Second Post",
    author: "Rachel",
    url: "dayn.com",
    likes: 12,
    id: "5e42e2922701700ade1d3ac0"
  }
];

beforeAll(async () => {
  await Blog.deleteMany({});

  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();

  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

test('blogs are returned in JSON format', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('the amount of blogs is as expected', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body.length).toBe(initialBlogs.length);
});

afterAll(() => {
  mongoose.connection.close();
});