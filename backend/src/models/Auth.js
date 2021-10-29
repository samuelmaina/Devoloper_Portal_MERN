const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const ranges = require("../config/constraints").auth;

const baseOptions = {
  discrimatorKeys: "memberToAuth",
  collection: "",
};

const Auth = new Schema(
  {
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
      required: true,
    },
    joiningDate: {
      type: Date,
      default: Date.now(),
    },
  },
  baseOptions
);

const { statics, methods } = Auth;

statics.createOne = async function (data) {
  const { name, password, email } = data;
  const hashedPassword = await hashPassword(password);
  const newMember = new this({
    name,
    email,
    password: hashedPassword,
  });
  return await newMember.save();
};
module.exports = mongoose.model("Auth", Auth);
