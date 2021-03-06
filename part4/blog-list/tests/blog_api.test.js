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

test('the UID is named \'id\'', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body[0].id).toBeDefined();
});

/* -- POST -- */
test('a new blog can be added', async () => {
  const newBlog = new Blog({
    title: "I'm a new Blog added from jest",
    author: "fullstackopen",
    url: "fullstackopen.com/en",
    likes: 100
  });

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await Blog.find({});
  expect(blogsAtEnd.length).toBe(initialBlogs.length + 1);

  const blogTitle = blogsAtEnd.map((blog) => blog.title);
  expect(blogTitle).toContain("I'm a new Blog added from jest");
});

test('likes default to 0, if not present', async () => {
  const newBlog = new Blog({
    title: "Likes default to 0",
    author: "fullstackopen",
    url: "fullstackopen.com/en"
  });

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);
  
  const newBlogAdded = await Blog.find({title: "Likes default to 0"});
  expect(newBlogAdded[0].likes).toBe(0);
});

test('Title and URL should not be missing', async () => {
  const newBlog = new Blog({
    title: '',
    author: "fullstackopen",
    url: ''
  });

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400);
});

/* -- DELETE -- */
test('blog with a valid ID can be deleted', async () => {
  const blogsAtStart = await Blog.find({});
  const firstBlog = blogsAtStart[0];
  await api
    .delete(`/api/blogs/${firstBlog.id}`)
    .expect(204);
  
  const blogsAtEnd = await Blog.find({});
  expect(blogsAtEnd.length).toBe(blogsAtStart.length - 1);
});

afterAll(() => {
  mongoose.connection.close();
});