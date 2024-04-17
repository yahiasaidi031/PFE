
require('dotenv').config()

module.exports = {
  PORT: process.env.PORT,
  DB_URL: process.env.MONGODB_URI,
  APP_SECRET: process.env.APP_SECRET,
  MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL,
  EXCHANGE_NAME: 'DON_PROJECT',
  USER_BINDING_KEY: 'USER_SERVICE',
  Queue_Name: 'USER_QUEUE'
};
