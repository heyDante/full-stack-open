const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const blogRouter = require('./controllers/blogRouter');
const mongoose = require('mongoose');

console.log('connecting to MongoDB Atlas..')
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then( () => {
    console.log('connected to MongoDB Atlas');
  })
  .catch( (error) => {
    console.log('error connecting to MongoDB Atlas', error.message)
  })

app.use(cors());
app.use(bodyParser.json());

app.use('/api/blogs', blogRouter);

module.exports = app;