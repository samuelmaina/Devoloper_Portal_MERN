const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const assert = require("assert");

const SALT_ROUNDS = 12;

exports.connectToDb = async (mongo_uri) => {
  try {
    const connection = await mongoose.connect(mongo_uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,

      // remove poolSize or set according to your need
      // read docs before setting poolSize
      // default to 5
      poolSize: 1,
    });
    assert.ok(connection, "No errors thrown but connection not established.");
  } catch (error) {
    console.log(error);
  }
};

exports.hashPassword = async (plain) => {
  return await bcrypt.hash(plain, SALT_ROUNDS);
};

exports.confirmPassword = async (plain, hash) => {
  return bcrypt.compare(plain, hash);
};
