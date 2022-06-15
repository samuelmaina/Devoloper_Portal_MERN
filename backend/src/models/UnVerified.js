const mongoose = require("mongoose");

const { hashPassword } = require("./utils");

const ranges = require("../constraints").auth;
const Schema = mongoose.Schema;

const UnVerified = new Schema({
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
  avatar: {
    type: String,
  },
  type: {
    type: String,
    required: true,
  },
});

const { statics, methods } = UnVerified;

statics.createOne = async function (data) {
  const hashedPassword = await hashPassword(data.password);
  const doc = new this(data);
  doc.password = hashedPassword;
  return doc.save();
};

statics.findOneByEmail = async function (email) {
  return await this.findOne({ email });
};

module.exports = mongoose.model("UnVerified", UnVerified);
