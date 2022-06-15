const path = require("path");

require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});

const envVars = process.env;

module.exports = {
  PORT: envVars.PORT,
  MONGO_URI: envVars.MONGO_URI,
  MONGO_URI: envVars.MONGO_URI,
  EMAIL_SENDER: envVars.EMAIL_SENDER,
  TOKEN_VALIDITY_IN_HOURS: envVars.TOKEN_VALIDITY_IN_HOURS,
  SENDGRID_API_KEY: envVars.SENDGRID_API_KEY,
  CLIENT_URL: envVars.CLIENT_URL,
  SESSION_SECRET: envVars.SESSION_SECRET,
  NODE_ENV: envVars.NODE_ENV,
};
