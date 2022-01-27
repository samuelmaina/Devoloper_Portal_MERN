const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const ObjectID = Schema.Types.ObjectId;

const ranges = require("../constraints").auth;

const Auth = new Schema(
  {
    user: {
      type: ObjectID,
      required: true,
      ref: "users",
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
  //some data will be copied directly from the database,
  //in which the objects will have _id which will conflict
  //with the assigned id with the mongodb.
  delete data["_id"];
  let newMember = new this(data);
  await newMember.save();
  return newMember;
};

statics.findOneByEmail = function (email) {
  return this.findOne({ email });
};

statics.findOneWithCredentials = async function (email, password) {
  const doc = await this.findOneByEmail(email);
  if (doc) {
    const doMatch = await bcrypt.compare(password, doc.password);
    if (doMatch) return doc;
    return null;
  }
  return null;
};

methods.delete = async function () {
  return await this.deleteOne();
};
module.exports = mongoose.model("Auth", Auth);
