const mongoose = require("mongoose");
const crypto = require("crypto");
const { TOKEN_VALIDITY_IN_HOURS } = require("../config");
const { token } = require("../constraints");

const Schema = mongoose.Schema;

const tokenValidityPeriodInMs = 1000 * 60 * 60 * TOKEN_VALIDITY_IN_HOURS;

const TokenGenerator = new Schema({
  requester: {
    type: String,
    required: true,
    minlength: token.requester.minlength,
    maxlength: token.requester.maxlength,
  },

  token: {
    type: String,
    maxlength: [token.howLong.exact, " token too long."],
    minlength: [token.howLong.exact, "token too short"],
  },
  expiryTime: {
    type: Date,
    min: Date.now(),
  },
});

TokenGenerator.index(
  {
    expiryTime: 1,
  },
  { expireAfterSeconds: 10 }
);
const { statics, methods } = TokenGenerator;

statics.createOne = async function (requester) {
  const existingRequesters = await this.find({ requester });
  if (existingRequesters.length > 0) {
    return existingRequesters[0];
  }
  const tokenDetails = new this({
    requester,
    token: crypto.randomBytes(token.howLong.exact / 2).toString("hex"),
    expiryTime: Date.now() + tokenValidityPeriodInMs,
  });
  await tokenDetails.save();
  return tokenDetails;
};

statics.findTokenDetailsByToken = async function (requester, token) {
  return await this.findOne({
    requester,
    token,
    expiryTime: { $gt: Date.now() },
  });
};
methods.delete = async function () {
  await this.deleteOne();
};

module.exports = mongoose.model("Token", TokenGenerator);
