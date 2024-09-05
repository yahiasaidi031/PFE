
require('dotenv').config()

module.exports = {
  PORT: process.env.PORT,
  DB_URL: process.env.MONGODB_URI,
  APP_SECRET: process.env.APP_SECRET,
  MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL,
  EXCHANGE_NAME: 'DON_PROJECT',
  PAIMENT_BINDING_KEY: 'PAIEMENT_SERVICE',
  USER_BINDING_KEY: 'USER_SERVICE',
  Queue_Name: 'PAIEMENT_QUEUE',
  FLOUCI_SECRET: process.env.FLOUCI_SECRET,
 YOUR_API_KEY : process.env.KONNECT_API_KEY,
 YOUR_WALLET_ID : process.env.KONNECT_WALLET_ID

};
