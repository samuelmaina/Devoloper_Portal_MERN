import mongoose from "mongoose";

import bcrypt from "bcrypt";
import assert from "assert";

const SALT_ROUNDS: number = 12;

const connectToDb = async (mongo_uri: string) => {
  try {
    const connection = await mongoose.connect(mongo_uri, {
      autoCreate: true,
      autoIndex: false,
    });

    assert.ok(connection, "No errors thrown but connection not established.");
  } catch (error: any) {
    //Throw so that the other parts don't continue to function if we are not
    //connected to the database.
    throw new Error(error);
  }
};
const hashPassword = async (plain: string) => {
  return await bcrypt.hash(plain, SALT_ROUNDS);
};
const confirmPassword = async (plain: string, hash: string) => {
  return bcrypt.compare(plain, hash);
};

export { connectToDb, hashPassword, confirmPassword };
