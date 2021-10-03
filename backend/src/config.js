require("dotenv").config();
const envVaribles = process.env;

module.exports = {
  PORT: envVaribles.PORT,
  MONGO_URI: envVaribles.MONGO_URI,
};
