import { Sequelize, Model, DataTypes } from "sequelize";

import { sequelize } from ".";

import { confirmPassword } from "./utils";
import { auth as ranges } from "../constrains";

const Auth = sequelize.define(
  "client",
  {
    name: {
      type: DataTypes.STRING(ranges.name.maxlength),
      validate: {
        isAlpha: true,
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
      validate: {
        is: /^[0-9a-f]{64}$/i,
      },
      allowNull: false,
    },
  },
  { timestamps: true }
);

//@ts-ignore
Auth.createOne = async function (data: object) {
  const result = deleteIdFromData(data);
  let newMember = this.create(result);
  return newMember;
};
//@ts-ignore
Auth.findOneByEmail = function (email: string) {
  return this.findOne({ where: { email } });
};
//@ts-ignore
Auth.findOneWithCredentials = async function (email: string, password: string) {
  //@ts-ignore
  const doc = await this.findOneByEmail(email);
  if (doc) {
    const doMatch = await doc.isPasswordCorrect(password);
    if (doMatch) return doc;
    return null;
  }
  return null;
};

Auth.prototype.isPasswordCorrect = async function (plain: string) {
  return await confirmPassword(plain, this.password);
};
Auth.prototype.delete = async function () {
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
export default Auth;
