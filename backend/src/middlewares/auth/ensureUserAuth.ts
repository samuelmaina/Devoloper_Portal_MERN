const { User } = require("../../models");

const guard = require("./baseAuth");
const name = "jwt";
module.exports = guard(User, name);
