const { UnVerified, User, TokenGenerator } = require("../models");
const { emailSender } = require("../services");
const { Responder } = require("../utils");

exports.signUp = async (req, res, next) => {
  try {
    const responder = new Responder(res);
    let existingEmail;
    const { body, params } = req;
    const type = params.type;
    const { email } = body;
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
    await emailSender();
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
