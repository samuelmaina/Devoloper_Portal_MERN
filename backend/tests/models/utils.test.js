const { connectToDb } = require("../../src/models/utils");
const mongoose = require("mongoose");
const { MONGO_URI } = require("../../src/config");
const { ensureEqual } = require("../utils/matchers");

describe("Utils Methods", () => {
  describe("connectTobb", () => {
    afterEach(async () => {
      await mongoose.connection.close();
    });
    it("should connect to without error", async () => {
      await connectToDb(MONGO_URI);
      ensureEqual(mongoose.connection.readyState, 1);
    });
  });
});
