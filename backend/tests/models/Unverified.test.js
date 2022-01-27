const { UnVerified } = require("../../src/models");
const { ensureEqual, ensureTruthy } = require("../utils/matchers");

const bcrypt = require("bcrypt");

const { includeSetUpAndTearDowns, clearDb } = require("./utils");

describe("Test for UnVerified", () => {
  includeSetUpAndTearDowns();
  afterEach(async () => {
    await clearDb();
  });
  describe("Statics", () => {
    describe("createOne", () => {
      it("should create one doc for correct data", async () => {
        const data = {
          name: "John Doe",
          email: "someexample@email.com",
          password: "example5",
          avatar: "link/to/some/avatar",
          type: "user",
        };
        const doc = await UnVerified.createOne(data);
        ensureEqual(doc.name, data.name);
        ensureEqual(doc.email, data.email);
        //will only return true if the the second param is the hash of the first one hence can be used to verifty
        //that the password is hashed.
        ensureTruthy(await bcrypt.compare(data.password, doc.password));
      });
    });

    describe("findOneByEmail", () => {
      it("should return one doc with the given email", async () => {
        const data1 = {
          name: "John Doe",
          email: "someexample1@email.com",
          password: "example5",
          avatar: "link/to/some/avatar1",
          type: "user",
        };

        const data2 = {
          name: "John Doe",
          email: "someexample2@email.com",
          password: "example5",
          avatar: "link/to/some/avatar2",
          type: "user",
        };
        const data3 = {
          name: "John Doe",
          email: "someexample3@email.com",
          password: "example5",
          avatar: "link/to/some/avatar3",
          type: "user",
        };

        await UnVerified.createOne(data1);
        await UnVerified.createOne(data2);
        await UnVerified.createOne(data3);

        const found = await UnVerified.findOneByEmail(data1.email);
        ensureEqual(found.name, data1.name);
        ensureEqual(found.email, data1.email);
      });
    });
  });
});
