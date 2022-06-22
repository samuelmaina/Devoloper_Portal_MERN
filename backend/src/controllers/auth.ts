import { NextFunction, Request, Response } from "express";

import { CLIENT_URL, SESSION_SECRET } from "../config";

import jwt, { SignCallback } from "jsonwebtoken";

import { Responder } from "../utils";

import { emailSender } from "../services";

import { UnVerified, User, TokenGenerator, Auth } from "../models";
const expiryTimeInSeconds = 3600;

export default {
  signUp: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const responder = new Responder(res);
      let existingEmail;
      const { body, params } = req;
      const type = params.type;
      const { name, email } = body;

      //@ts-ignore
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
      //@ts-ignore
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
      //@ts-ignore
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
  },

  verifyEmail: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const responder = new Responder(res);
      const { params } = req;
      const { token } = params;
      //@ts-ignore
      const tokenDetails = await TokenGenerator.findTokenDetailsByToken(token);
      if (tokenDetails) {
        const email = tokenDetails.requester;
        //@ts-ignore
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
  },

  login: async function (req: Request, res: Response, next: NextFunction) {
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
        const cb: any = (err: any, token: string) => {
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
  },
};

async function createOneForType(type: string, data: object) {
  switch (type) {
    case "user":
      //@ts-ignore
      return await User.createOne(data);
      break;
    default:
      break;
  }
}

function findByEmailForType(email: string, type: string) {
  switch (type) {
    case "user":
      //@ts-ignore
      return User.findOneByEmail(email);
      break;
    default:
      break;
  }
}

function findOneWithCredentialsByType(
  type: string,
  email: string,
  password: string
) {
  switch (type) {
    case "user":
      //@ts-ignore
      return User.findOneWithCredentials(email, password);
      break;
    default:
      break;
  }
}

function loginIn(payload: object, cb: any) {
  const config = {
    expiresIn: expiryTimeInSeconds,
  };
  jwt.sign(payload, SESSION_SECRET, config, cb);
}
