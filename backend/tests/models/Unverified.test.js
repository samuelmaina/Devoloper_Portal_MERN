const { UnAuth } = require("../../src/models");
const { ensureEqual, ensureTruthy } = require("../utils/matchers");

const bcrypt = require("bcrypt");

const { includeSetUpAndTearDowns } = require("./utils");
describe("Test for UnAuth", () => {
  includeSetUpAndTearDowns();
  describe("Statics", () => {
    describe("createOne", () => {
      it("should create one doc for correct data", async () => {
        const data = {
          name: "John Doe",
          email: "someexample@gmail.com",
          password: "example5",
        };
        const doc = await UnAuth.createOne(data);
        ensureEqual(doc.name, data.name);
        ensureEqual(doc.email, data.email);
        //will only return true if the the second param is the hash of the first one hence can be used to verifty
        //that the password is hashed.
        ensureTruthy(await bcrypt.compare(data.password, doc.password));
      });
    });

    describe("findOneByEmail", () => {
      it("should return one doc with the given email", async () => {
        const data = {
          name: "John Doe",
          email: "someexample@gmail.com",
          password: "example5",
        };
        const doc = await UnAuth.createOne(data);
        ensureEqual(doc.name, data.name);
        ensureEqual(doc.email, data.email);
        //will only return true if the the second param is the hash of the first one hence can be used to verifty
        //that the password is hashed.
        ensureTruthy(await bcrypt.compare(data.password, doc.password));
      });
    });
  });
});
