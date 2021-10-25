const mongoose = require("mongoose");

const { hashPassword } = require("./utils");

const ranges = require("../constraints").auth;
const Schema = mongoose.Schema;

const UnAuth = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: ranges.name.minlength,
    maxlength: ranges.name.maxlength,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    minlength: ranges.email.minlength,
    maxlength: ranges.email.maxlength,
  },
  password: {
    type: String,
    required: true,
    maxlength: 80,
    minlength: 10,
  },
});

const { statics, methods } = UnAuth;

statics.createOne = async function (data) {
  const hashedPassword = await hashPassword(data.password);
  const doc = new this(data);
  doc.password = hashedPassword;
  return doc.save();
};

statics.findOneByEmail = function (email) {
  return this.find({ email });
};

module.exports = mongoose.model("UnAuth", UnAuth);
