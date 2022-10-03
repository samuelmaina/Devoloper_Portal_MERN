import { DataTypes } from "sequelize";

import { sequelize, User } from ".";

const Profile = sequelize.define(
  "profile",
  {
    handle: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    company: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    website: {
      type: DataTypes.STRING(20),
      validate: {
        isUrl: true,
      },
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING(20),
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
      allowNull: false,
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
