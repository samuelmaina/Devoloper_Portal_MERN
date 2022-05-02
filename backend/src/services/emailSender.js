const sgMail = require("@sendgrid/mail");
const { SENDGRID_API_KEY, EMAIL_SENDER } = require("../config");
sgMail.setApiKey(SENDGRID_API_KEY);

module.exports = async (msg) => {
  try {
    msg.from = EMAIL_SENDER;
    await sgMail.send(msg);
  } catch (error) {
    throw new Error(error);
  }
};
