import mongoose from "mongoose";

import { hashPassword } from "./utils";

import { auth as ranges } from "../constrains";

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

interface IUnVerified extends Document {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  type: string;
}

statics.createOne = async function (data: any) {
  const hashedPassword = await hashPassword(data.password);
  // @ts-ignore
  const doc = new this(data);
  doc.password = hashedPassword;
  return doc.save();
};

statics.findOneByEmail = async function (email) {
  return await this.findOne({ email });
};

export default mongoose.model<IUnVerified>("UnVerified", UnVerified);
