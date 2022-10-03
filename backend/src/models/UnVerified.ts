import { Sequelize, Model, DataTypes } from "sequelize";

import { sequelize } from ".";

import { confirmPassword, hashPassword } from "./utils";
import { auth as ranges } from "../constrains";

const UnVerified = sequelize.define(
  "unverified",
  {
    name: {
      type: DataTypes.STRING(ranges.name.maxlength),
      validate: {
        min: 3,
      },

      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(ranges.email.maxlength),
      validate: { isEmail: true },
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING(60),
      allowNull: true,
    },
  },
  { timestamps: true }
);

//@ts-ignore
UnVerified.createOne = async function (data: any) {
  data.password = await hashPassword(data.password);
  const result = deleteIdFromData(data);
  console.log(result);
  let newMember = await this.create(result);
  return newMember;
};
//@ts-ignore
UnVerified.findOneByEmail = function (email: string) {
  return this.findOne({ where: { email } });
};
//@ts-ignore
UnVerified.findOneWithCredentials = async function (
  email: string,
  password: string
) {
  //@ts-ignore
  const doc = await this.findOneByEmail(email);
  if (doc) {
    const doMatch = await doc.isPasswordCorrect(password);
    if (doMatch) return doc;
    return null;
  }
  return null;
};

UnVerified.prototype.delete = async function () {
  return await this.destroy();
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

UnVerified.sync();
export default UnVerified;
