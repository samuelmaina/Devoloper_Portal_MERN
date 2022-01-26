const { BASE_URL } = require("../config");
const { UnVerified, User, TokenGenerator, Auth } = require("../models");
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
          <p>Thank you for joing the online shop. Please confirm your email by clicking on the following link</p>
          <a href=${BASE_URL}/verify/${tokenDetails.token}> Click here</a>
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

exports.verifyEmail = async (req, res, next) => {
  try {
    const responder = new Responder(res);
    const { token } = req.params;

    const tokenDetails = await TokenGenerator.findTokenDetailsByToken(token);
    if (tokenDetails) {
      const email = tokenDetails.requester;
      const details = await UnVerified.findOneByEmail(email);

      await Auth.createOne(details);
      await details.delete();
      await tokenDetails.delete();
      return responder
        .withStatusCode(201)
        .withMessage("Email verfication successful.")
        .send();
    } else
      return responder
        .withStatusCode(403)
        .withMessage("Email verfication failed.")
        .send();
  } catch (error) {
    next(error);
  }
};

exports.postLogin = async function (req, res, next) {
  try {
    const responder = new Responder(res);
    const { loginIn } = auth;
    const { body, params } = req;
    const type = params.type;
    const { email, password } = body;

    const details = await findOneWithCredentialsByType(type, email, password);
    if (details) {
      const payload = {
        id: details.id,
      };
      const cb = (err, token) => {
        try {
          if (err) return next(err);
          const data = {
            success: true,
            auth: type,
            token: "Bearer " + token,
          };
          responder.withStatusCode(201).withData(data).send();
        } catch (error) {
          next(error);
        }
      };
      return loginIn(payload, cb);
    }
    responder.withStatusCode(401).withError("Invalid Email or Password").send();
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
