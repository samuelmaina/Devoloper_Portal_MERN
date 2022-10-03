import { Sequelize, Model, DataTypes, Op } from "sequelize";

import crypto from "crypto";

import { TOKEN_VALIDITY_IN_HOURS } from "../config";
import { token } from "../constrains";

const tokenValidityPeriodInMs: number =
  1000 * 60 * 60 * TOKEN_VALIDITY_IN_HOURS;

import { sequelize } from ".";

const TokenGenerator = sequelize.define(
  "tokenGenerator",
  {
    requester: {
      type: DataTypes.STRING(token.requester.maxlength),
      validate: {
        isEmail: true,
      },
      allowNull: false,
      unique: true,
    },
    token: {
      type: DataTypes.STRING(token.howLong.exact),
      validate: { isAlphanumeric: true },
      allowNull: false,
      unique: true,
    },
    expiryTime: {
      type: DataTypes.DATE,
      defaultValue: Date.now() + tokenValidityPeriodInMs,
    },
  },
  { timestamps: true }
);

//@ts-ignore
TokenGenerator.createOne = async function (requester: string) {
  const existing = await this.findOne({
    where: {
      requester,
    },
  });

  if (existing) return existing;

  let newMember = this.create({
    requester,
    token: crypto.randomBytes(token.howLong.exact / 2).toString("hex"),
  });
  return newMember;
};
//@ts-ignore
TokenGenerator.findTokenDetailsByToken = async function (token) {
  return await this.findOne({
    where: {
      token,
      expiryTime: { [Op.gte]: Date.now() },
    },
  });
};

TokenGenerator.prototype.delete = async function () {
  return await this.destroy();
};

TokenGenerator.sync();

export default TokenGenerator;
