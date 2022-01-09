const sgMail = require("@sendgrid/mail");
const { SENDGRID_API_KEY, EMAIL_SENDER } = require("../config");
sgMail.setApiKey(SENDGRID_API_KEY);

module.exports = async (msg) => {
  try {
    console.log("This is the email sender", EMAIL_SENDER);
    msg.from = EMAIL_SENDER;
    const result = await sgMail.send(msg);
    if (result) {
      console.log("the email was sent succcessfully.");
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
