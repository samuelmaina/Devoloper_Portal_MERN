const passport = require("passport");

const baseSetup = require("./baseSetup");
const stragegy = "jwt";

module.exports = (Model, passportName) => {
  baseSetup(passport, Model, passportName);
  const config = {
    session: false,
  };
  return passport.authenticate(stragegy, config);
};
