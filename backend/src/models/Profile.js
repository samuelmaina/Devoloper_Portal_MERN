const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ObjectID = Schema.Types.ObjectId;

const Profile = new Schema({
  user: {
    type: ObjectID,
    required: true,
    ref: "users",
  },
  handle: {
    type: String,
    required: true,
    maxlength: 40,
  },
  company: {
    type: String,
  },
  website: {
    type: String,
  },
  location: {
    type: Array,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  bio: {
    type: String,
  },
  githubusername: {
    type: String,
  },
  experience: [
    {
      title: {
        type: String,
        required: true,
      },
      company: {
        type: String,
        required: true,
      },
      location: {
        type: String,
        required: true,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
        required: true,
      },
    },
  ],

  education: [
    {
      school: {
        type: String,
        required: true,
      },
      fieldOfStudy: {
        type: String,
        required: true,
      },
      location: {
        type: String,
        required: true,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
        required: true,
      },
    },
  ],
  socials: {
    youtube: { type: String },
    facebook: { type: String },
    twitter: { type: String },
    linkedin: { type: String },
    instagram: { type: String },
  },
  joiningDate: {
    type: Date,
    default: Date.now(),
  },
});

const { statics, methods } = Profile;

statics.createOne = async function (data) {
  return await new this(data).save();
};

statics.findOneWithUserId = async function (userId) {
  return await this.findOne({ user: userId });
};

module.exports = mongoose.model("profile", Profile);
