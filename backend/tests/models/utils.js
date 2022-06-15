require("dotenv").config();
const mongoose = require("mongoose");
const { hash } = require("bcrypt");

const assert = require("assert");

const { connectToDb } = require("../../src/models/utils");
const { Auth } = require("../../src/models");

exports.connectToTestDb = async () => {
  await connectToDb(process.env.MONGO_TEST_URI);
};

exports.disconnectFromTestDb = async () => {
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
    return await Model.find().countDocuments();
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

exports.generateRandomMongooseId = () => {
  return mongoose.Types.ObjectId();
};

exports.createTestDocs = async function () {
  const plain = "somePassword55??";
  const hashed = await hash(plain, 12);
  let data1 = {
    name: "Jonn Doe",
    email: "test1@test.com",
    password: hashed,
    avatar: "/path/to/email/avatar1",
  };
  let data2 = {
    name: "Jonn Doe",
    email: "test2@test.com",
    password: hashed,
    avatar: "/path/to/email/avatar2",
  };

  let data3 = {
    name: "Jonn Doe",
    email: "test3@test.com",
    password: hashed,
    avatar: "/path/to/email/avatar3",
  };
  await Auth.createOne(data1);
  await Auth.createOne(data2);
  await Auth.createOne(data3);
  return { data1, data2, data3, plain };
};
