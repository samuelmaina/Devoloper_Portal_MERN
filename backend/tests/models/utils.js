require("dotenv").config();
const mongoose = require("mongoose");
const assert = require("assert");

const { connectToDb } = require("../../src/models/utils");

exports.connectToTestDb = async () => {
  await connectToDb(process.env.MONGO_TEST_URI);
};

exports.disconnectFromTestDb = async () => {
  // await this.clearDb();
  await mongoose.connection.close();
};
exports.includeSetUpAndTearDowns = () => {
  beforeAll(async () => {
    await this.connectToTestDb();
  });
  afterAll(async () => {
    await this.disconnectFromTestDb();
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
    const Models = mongoose.modelNames();
    for (const ModelName of Models) {
      const Model = mongoose.model(ModelName);
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
    console.log(error);
  }
};
