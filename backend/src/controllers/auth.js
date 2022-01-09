const { BASE_URL } = require("../config");
const { UnVerified, User, TokenGenerator } = require("../models");
const { emailSender } = require("../services");
const { Responder } = require("../utils");

exports.signUp = async (req, res, next) => {
  try {
    const responder = new Responder(res);
    let existingEmail;
    const { body, params } = req;
    const type = params.type;
    const { email, name } = body;
    existingEmail = await UnVerified.findOneByEmail(email);
    if (existingEmail) {
      return responder
        .withStatusCode(401)
        .withError(
          "Email not verified. Please verify Email by clicking the link sent to your inbox."
        )
        .send();
    }
    existingEmail = await findByEmailForType(email, type);
    if (existingEmail) {
      return responder
        .withStatusCode(401)
        .withError("Email already taken. Please try another one.")
        .send();
    }
    const tokenDetails = await TokenGenerator.createOne(email);
    const emailBody = {
      to: email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
          <h2>Hello ${name}</h2>
          <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
          <a href=${BASE_URL}/${tokenDetails.token}> Click here</a>
          </div>`,
    };

    await emailSender(emailBody);
    return responder
      .withStatusCode(201)
      .withMessage(
        "Sign Up successful.A link has been sent to your email. Click on it to verify your account."
      )
      .send();
  } catch (error) {
    next(error);
  }
};

function findByEmailForType(email, type) {
  switch (type) {
    case "user":
      return User.findOneByEmail(email);
      break;
    default:
      break;
  }
}
