import mongoose from "mongoose";
import crypto from "crypto";

import { TOKEN_VALIDITY_IN_HOURS } from "../config";
import { token } from "../constrains";

const Schema = mongoose.Schema;

const tokenValidityPeriodInMs: number =
  1000 * 60 * 60 * TOKEN_VALIDITY_IN_HOURS;

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
  { expireAfterSeconds: TOKEN_VALIDITY_IN_HOURS * 3600 }
);

interface IToken extends Document {
  requester: string;
}
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

statics.findTokenDetailsByToken = async function (token) {
  return await this.findOne({
    token,
    expiryTime: { $gt: Date.now() },
  });
};
methods.delete = async function () {
  await this.deleteOne();
};

export default mongoose.model<IToken>("Token", TokenGenerator);
