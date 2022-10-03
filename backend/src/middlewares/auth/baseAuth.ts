import passport from "passport";

import baseSetup from "./baseSetup";

const stragegy = "jwt";

export default (Model: any, passportName: string) => {
  baseSetup(passport, Model, passportName);
  const config = {
    session: false,
  };
  return passport.authenticate(stragegy, config);
};
