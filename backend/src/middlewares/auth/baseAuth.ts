const passport = require("passport");
const { Model } = require("mongoose");

const baseSetup = require("./baseSetup");
const stragegy = "jwt";

module.exports = (Model:, passportName: string) => {
  baseSetup(passport, Model, passportName);
  const config = {
    session: false,
  };
  return passport.authenticate(stragegy, config);
};
