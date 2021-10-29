const sgMail = require("@sendgrid/mail");
const { SENDGRID_API_KEY } = require("../config");
sgMail.setApiKey(SENDGRID_API_KEY);

const sender = "samuelmainaonlineshop@gmail.com";

module.exports = async (msg) => {
  try {
    msg.from = sender;
    const result = await sgMail.send(msg);
    if (result) {
      console.log("the email was sent succcessfully.");
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
