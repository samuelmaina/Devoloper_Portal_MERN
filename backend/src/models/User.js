const mongoose = require("mongoose");
const Base = require("./Auth");
const User = Base.discriminator("user", new mongoose.Schema({}));
module.exports = User;
