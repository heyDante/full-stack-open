const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const blogRouter = require('./controllers/blogRouter');
const config = require('./utils/config');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');

const app = express();

logger.info('connecting to MongoDB Atlas..', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
  .then( () => {
    logger.info('connected to MongoDB Atlas');
  })
  .catch( (error) => {
    logger.error('error connecting to MongoDB Atlas', error.message);
  });

app.use(cors());
app.use(bodyParser.json());
app.use(middleware.requestLogger);

/* -- The middlewares defined above will be used for the route defined below -- */
app.use('/api/blogs', blogRouter);

app.use(middleware.unknownRouteHandler);
app.use(middleware.errorHandler);

module.exports = app;