const mongoose = require("mongoose");
const Base = require("./Auth");
const User = Base.discriminator("User", new mongoose.Schema({}));
module.exports = User;
