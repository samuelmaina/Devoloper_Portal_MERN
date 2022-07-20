import { DataTypes } from "sequelize";

import { sequelize, User } from ".";

import { auth as ranges } from "../constrains";

const Profile = sequelize.define(
  "profile",
  {
    handle: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    compnay: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    website: {
      type: DataTypes.STRING(20),
      validate: {
        isUrl: true,
      },
      allowNull: false,
    },
    location: {
      type: DataTypes.ARRAY(DataTypes.FLOAT(10)),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    skills: {
      type: DataTypes.ARRAY(DataTypes.STRING(10)),
      allowNull: false,
    },
    bio: {
      type: DataTypes.STRING(2000),
      allowNull: false,
    },
    githubusername: {
      type: DataTypes.STRING(50),
    },
    //@ts-ignore
    experience: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: true,
    },

    //@ts-ignore
    education: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: false,
    },

    //@ts-ignore
    socials: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: true,
    },
  },
  { timestamps: true }
);

//@ts-ignore
Profile.createOne = async function (data: any) {
  let newMember = this.create(data);
  return newMember;
};
//@ts-ignore
Profile.findOneWithUserId = function (userId: string) {
  return this.findOne({ where: { userId } });
};

Profile.belongsTo(User);

Profile.sync();

export default Profile;
