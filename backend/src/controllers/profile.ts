import { NextFunction, Request, Response } from "express";
import { Profile } from "../models";

const { Responder } = require("../utils");

export default {
  getUserProfile: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const responder = new Responder(res);
      //@ts-ignore
      const profile = await Profile.findOneWithUserId(req.user.id);
      if (!profile)
        return responder
          .withStatusCode(404)
          .withError("You don't have any profile yet.Consider creating one.")
          .send();
      return responder
        .withStatusCode(200)
        .attachDataToResBody(profile._doc)
        .send();
    } catch (error) {
      next(error);
    }
  },

  updateProfile: async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("Reached the post route");
      const responder = new Responder(res);

      const { body, user } = req;
      //@ts-ignore
      body.user = user.id;

      //@ts-ignore
      const profile = await Profile.findOneWithUserId(user.id);
      if (!profile) {
        //@ts-ignore
        await Profile.createOne(body);
        return responder
          .withStatusCode(200)
          .withMessage("Profile created successfully.")
          .send();
      }
    } catch (error) {
      next(error);
    }
  },
};
