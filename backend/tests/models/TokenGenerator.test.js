const { UnVerified, TokenGenerator } = require("../../src/models");
const { ensureEqual, ensureTruthy } = require("../utils/matchers");

const bcrypt = require("bcrypt");

const { includeSetUpAndTearDowns, clearDb } = require("./utils");
const { token } = require("../../src/constraints");

describe("Token Generator", () => {
  includeSetUpAndTearDowns();
  afterEach(async () => {
    await clearDb();
  });
  describe("Statics", () => {
    describe("createOne", () => {
      it("should create one doc for correct data", async () => {
        const email = "unique@email.com";
        const doc = await TokenGenerator.createOne(email);
        ensureEqual(doc.requester, email);
        ensureEqual(doc.token.length, token.howLong.exact);
      });
    });
  });
});
