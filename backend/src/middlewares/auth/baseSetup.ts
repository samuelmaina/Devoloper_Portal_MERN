const passportJWT = require("passport-jwt");
const { SESSION_SECRET } = require("../../config");
const { Strategy, ExtractJwt } = passportJWT;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SESSION_SECRET;

module.exports = (passport, Model, passportName) => {
  const local = new Strategy(opts, async (payload, done) => {
    const { name, id, email } = await Model.findById(payload.id);
    const data = { name, id, email };
    done(null, data);
  });
  passport.use(passportName, local);
};
