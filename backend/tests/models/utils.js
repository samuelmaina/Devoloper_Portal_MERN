require("dotenv").config();
const mongoose = require("mongoose");

const { connectToDb } = require("../../src/models/utils");

const Models = require("../../src/models");

exports.includeSetUpAndTearDowns = () => {
  beforeAll(async () => {
    await connectToDb(process.env.MONGO_TEST_URI);
  });
  afterAll(async () => {
    await mongoose.connection.close();
  });
};

exports.clearModel = async (Model) => {
  const noOfDocs = async () => {
    return await Model.countDocuments();
  };
  await Model.deleteMany();
  const countAfterDeletion = await noOfDocs();
  assert.strictEqual(
    countAfterDeletion,
    0,
    `the model (${Model.modelName} not cleared completely.`
  );
};

exports.clearDb = async () => {
  try {
    for (const ModelName in Models) {
      const Model = Models[ModelName];
      const getNoOfDocs = async () => {
        return await Model.find().countDocuments();
      };
      let count = await getNoOfDocs();
      if (count > 0) {
        await this.clearModel(Model);
      }
      count = await getNoOfDocs();
      assert.strictEqual(count, 0, "deletion not complete");
    }
  } catch (error) {
    throw new Error(error);
  }
};

exports.clearDb = async () => {};
