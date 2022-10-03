import passportJWT from "passport-jwt";

import { SESSION_SECRET } from "../../config";

const { Strategy, ExtractJwt } = passportJWT;

const opts: any = {};

//@ts-ignore
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SESSION_SECRET;

export default (passport: any, Model: any, passportName: string) => {
  const local = new Strategy(opts, async (payload: object, done: Function) => {
    //@ts-ignore
    const { name, id, email } = await Model.findByPk(payload.id);
    const data = { name, id, email };
    done(null, data);
  });
  passport.use(passportName, local);
};
