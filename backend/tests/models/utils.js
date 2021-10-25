require("dotenv").config();
const mongoose = require("mongoose");

const { connectToDb } = require("../../src/models/utils");

exports.includeSetUpAndTearDowns = () => {
  beforeAll(async () => {
    await connectToDb(process.env.MONGO_TEST_URI);
  });
  afterAll(async () => {
    await mongoose.connection.close();
  });
};
