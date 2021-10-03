const mongoose = require("mongoose");

const assert = require("assert");

exports.connectToDb = async (mongo_uri) => {
  try {
    const connection = await mongoose.connect(mongo_uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    assert.ok(connection, "No errors thrown but connection not established.");
  } catch (error) {
    throw new Error(error);
  }
};
