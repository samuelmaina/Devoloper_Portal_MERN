const { Profile } = require("../models");
const { Responder } = require("../utils");

exports.getUserProfile = async (req, res, next) => {
  try {
    const responder = new Responder(res);
    const profile = await Profile.findOneWithUserId(req.user.id);
    if (!profile)
      return responder
        .withStatusCode(404)
        .withMessage("You don't have any profile yet.Consider creating one.")
        .send();
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const responder = new Responder(res);

    return responder
      .withStatusCode(200)
      .withMessage("Profile created successfully.")
      .send();
  } catch (error) {
    next(error);
  }
};
