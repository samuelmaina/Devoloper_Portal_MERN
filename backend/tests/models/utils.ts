import dotenv from "dotenv";
import mongoose from "mongoose";
import { hash } from "bcrypt";
import assert from "assert";

import { connectToDb } from "../../src/models/utils";
import { Auth } from "../../src/models";
dotenv.config();

let sequalize: any;

export const connectToTestDb = async () => {
  //@ts-ignore
  sequalize = connectToDb(process.env.MONGO_TEST_URI);
};
export const disconnectFromTestDb = async () => {
  await sequalize.close();
};
export const includeSetUpAndTearDowns = () => {
  beforeAll(async () => {
    await connectToTestDb();
  });
  afterAll(async () => {
    await disconnectFromTestDb();
  });
};

export const clearModel = async (Model: any) => {
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

export const clearDb = async () => {
  try {
    const Models = mongoose.modelNames();
    for (const ModelName of Models) {
      const Model = mongoose.model(ModelName);

      const getNoOfDocs = async () => {
        return await Model.find().countDocuments();
      };
      let count = await getNoOfDocs();
      if (count > 0) {
        await clearModel(Model);
      }
      count = await getNoOfDocs();
      assert.strictEqual(count, 0, "deletion not complete");
    }
  } catch (error) {
    console.log(error);
  }
};

export const generateRandomMongooseId = () => {
  return new mongoose.Types.ObjectId();
};

export const createTestDocs = async function () {
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
  //@ts-ignore
  await Auth.createOne(data1);
  //@ts-ignore

  await Auth.createOne(data2);
  //@ts-ignore
  await Auth.createOne(data3);
  return { data1, data2, data3, plain };
};
