import path from "path";
import dotenv from "dotenv";

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const envVars: any = process.env;

const PORT: string = envVars.PORT;
const MONGO_URI: string = envVars.MONGO_URI;
const EMAIL_SENDER: string = envVars.EMAIL_SENDER;
const TOKEN_VALIDITY_IN_HOURS: number = Number(envVars.TOKEN_VALIDITY_IN_HOURS);
const SENDGRID_API_KEY: string = envVars.SENDGRID_API_KEY;
const CLIENT_URL: string = envVars.CLIENT_URL;
const SESSION_SECRET: string = envVars.SESSION_SECRET;
const NODE_ENV: string = envVars.NODE_ENV;

export {
  PORT,
  MONGO_URI,
  EMAIL_SENDER,
  TOKEN_VALIDITY_IN_HOURS,
  SENDGRID_API_KEY,
  CLIENT_URL,
  SESSION_SECRET,
  NODE_ENV,
};
