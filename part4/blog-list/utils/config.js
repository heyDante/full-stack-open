require('dotenv').config();

let MONGODB_URI = process.env.MONGODB_URI;

/* -- 
Make sure we use an entirely new mongo collection for testing
To make a new collection we just change the name in the testing URI 
-- */

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI;
}

let PORT = process.env.PORT;

module.exports = {
  MONGODB_URI,
  PORT
};