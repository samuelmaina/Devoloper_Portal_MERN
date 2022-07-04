import mongoose from "mongoose";

import { confirmPassword } from "./utils";
import { auth as ranges } from "../constrains";

const Schema = mongoose.Schema;

const baseOptions: object = {
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

statics.createOne = async function (data: object) {
  const result = deleteIdFromData(data);
  let newMember = new this(result);
  await newMember.save();
  return newMember;
};

statics.findOneByEmail = function (email) {
  return this.findOne({ email });
};

statics.findOneWithCredentials = async function (email, password) {
  //@ts-ignore
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

function deleteIdFromData(data: any) {
  const result: any = {};
  for (const key in data) {
    if (key === "_id") {
      continue;
    } else result[key] = data[key];
  }
  return result;
}
export default mongoose.model("Auth", Auth);
