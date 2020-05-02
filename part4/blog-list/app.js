require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const blogsRouter = require('./controllers/blogsRouter');
const usersRouter = require('./controllers/usersRouter');
const loginRouter = require('./controllers/loginRouter');

const config = require('./utils/config');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');

const app = express();

logger.info('connecting to MongoDB Atlas..', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})
  .then( () => {
    logger.info('connected to MongoDB Atlas');
  })
  .catch( (error) => {
    logger.error('error connecting to MongoDB Atlas', error.message);
  });

app.use(cors());
app.use(bodyParser.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

/* -- The middlewares defined above will be used for the route defined below -- */
app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testingRouter');
  app.use('/api/testing', testingRouter);
}

app.use(middleware.unknownRouteHandler);
app.use(middleware.errorHandler);

module.exports = app;