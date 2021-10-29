require("dotenv").config();
const envVars = process.env;

module.exports = {
  PORT: envVars.PORT,
  MONGO_URI: envVars.MONGO_URI,
  TOKEN_VALIDITY_IN_HOURS: envVars.TOKEN_VALIDITY_IN_HOURS,
  SENDGRID_API_KEY: envVars.SENDGRID_API_KEY,
};
