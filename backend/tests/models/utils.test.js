const mongoose = require("mongoose");
const { MONGO_URI } = require("../../src/config");
const { ensureEqual } = require("../utils/matchers");

const { connectToDb, hashPassword } = require("../../src/models/utils");

describe.skip("Utils Methods", () => {
  describe("connectTobb", () => {
    afterEach(async () => {
      await mongoose.connection.close();
    });
    it("should connect to without error", async () => {
      await connectToDb(MONGO_URI);
      ensureEqual(mongoose.connection.readyState, 1);
    });
  });

  it(" hashPssword should hash password ", async () => {
    const example = "password5??";
    const hashed = await hashPassword(example);
    ensureEqual(hashed.length, 60);
  });
});
