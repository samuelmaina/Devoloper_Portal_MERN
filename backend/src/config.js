require("dotenv").config();
const envVars = process.env;

module.exports = {
  PORT: envVars.PORT,
  MONGO_URI: envVars.MONGO_URI,
  EMAIL_SENDER: envVars.EMAIL_SENDER,
  TOKEN_VALIDITY_IN_HOURS: envVars.TOKEN_VALIDITY_IN_HOURS,
  SENDGRID_API_KEY: envVars.SENDGRID_API_KEY,
  BASE_URL: envVars.BASE_URL,
};
