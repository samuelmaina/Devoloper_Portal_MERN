const mongoose = require("mongoose");
const { confirmPassword } = require("./utils");

const Schema = mongoose.Schema;

const ranges = require("../constraints").auth;

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
  const result = deleteIdFromData(data);
  let newMember = new this(result);
  await newMember.save();
  return newMember;
};

statics.findOneByEmail = function (email) {
  return this.findOne({ email });
};

statics.findOneWithCredentials = async function (email, password) {
  const doc = await this.findOneByEmail(email);
  if (doc) {
    const doMatch = await doc.isPasswordCorrect(password);
    if (doMatch) return doc;
    return null;
  }
  return null;
};

methods.isPasswordCorrect = async function (plain) {
  return await confirmPassword(plain, this.password);
};
methods.delete = async function () {
  return await this.deleteOne();
};

function deleteIdFromData(data) {
  const result = {};
  for (const key in data) {
    if (key === "_id") {
      continue;
    } else result[key] = data[key];
  }
  return result;
}
module.exports = mongoose.model("Auth", Auth);
