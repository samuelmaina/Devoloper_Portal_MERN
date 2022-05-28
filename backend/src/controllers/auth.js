const { CLIENT_URL, SESSION_SECRET } = require("../config");
const { UnVerified, User, TokenGenerator, Auth } = require("../models");
const { emailSender } = require("../services");
const { Responder } = require("../utils");

const jwt = require("jsonwebtoken");
const expiryTimeInSeconds = 3600;

exports.signUp = async (req, res, next) => {
  try {
    const responder = new Responder(res);
    let existingEmail;
    const { body, params } = req;
    const type = params.type;
    const { name, email } = body;
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
          <p>Thank you for joing the Kakao.Where developers come to meet. Please confirm your email by clicking on the following link</p>
          <a href=${CLIENT_URL}/verify/${tokenDetails.token}> Click here</a>
          </div>`,
    };
    const data = { ...body };
    data.type = type;

    await UnVerified.createOne(data);
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
    const { params } = req;
    const { token } = params;

    const tokenDetails = await TokenGenerator.findTokenDetailsByToken(token);
    if (tokenDetails) {
      const email = tokenDetails.requester;
      const details = await UnVerified.findOneByEmail(email);
      await createOneForType(details.type, details);
      await details.delete();
      await tokenDetails.delete();
      return responder
        .withStatusCode(201)
        .withMessage("Email verfication successful.")
        .send();
    } else
      return responder
        .withStatusCode(403)
        .withError("Email verfication failed.")
        .send();
  } catch (error) {
    next(error);
  }
};

exports.login = async function (req, res, next) {
  try {
    const responder = new Responder(res);

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
          responder.withStatusCode(201).attachDataToResBody(data).send();
        } catch (error) {
          next(error);
        }
      };
      return loginIn(payload, cb);
    }
    return responder
      .withStatusCode(401)
      .withError("Invalid Email or Password")
      .send();
  } catch (error) {
    next(error);
  }
};

async function createOneForType(type, data) {
  switch (type) {
    case "user":
      return await User.createOne(data);
      break;
    default:
      break;
  }
}

function findByEmailForType(email, type) {
  switch (type) {
    case "user":
      return User.findOneByEmail(email);
      break;
    default:
      break;
  }
}

function findOneWithCredentialsByType(type, email, password) {
  switch (type) {
    case "user":
      return User.findOneWithCredentials(email, password);
      break;
    default:
      break;
  }
}

function loginIn(payload, cb) {
  const config = {
    expiresIn: expiryTimeInSeconds,
  };
  jwt.sign(payload, SESSION_SECRET, config, cb);
}
