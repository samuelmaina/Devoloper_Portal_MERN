const Auth = require("../../src/models/Auth");
const { ensureEqual } = require("../utils/matchers");
const { includeSetUpAndTearDowns, clearDb } = require("./utils");

describe.skip("Auth Model", () => {
  includeSetUpAndTearDowns();
  afterEach(async () => {
    await clearDb();
  });
  it("createOne should create a document for the auth model", async () => {
    const data = {
      name: "Jonn Doe",
      email: "test@test.com",
      password: "HashedPa55word?",
      avatar: "/path/to/email/avatar",
    };
    const doc = await Auth.createOne(data);

    ensureDocHasTheRightData(doc, data);
  });
  it("findOneByEmail should return a doc with the given email", async () => {
    const data1 = {
      name: "Jonn Doe",
      email: "test1@test.com",
      password: "HashedPa55word?",
      avatar: "/path/to/email/avatar",
    };
    const data2 = {
      name: "Jonn Doe",
      email: "test2@test.com",
      password: "HashedPa55word?",
      avatar: "/path/to/email/avatar",
    };

    const data3 = {
      name: "Jonn Doe",
      email: "test3@test.com",
      password: "HashedPa55word?",
      avatar: "/path/to/email/avatar",
    };
    await Auth.createOne(data1);
    await Auth.createOne(data2);
    await Auth.createOne(data3);

    const found = await Auth.findOneByEmail(data3.email);
    ensureDocHasTheRightData(found, data3);
  });
});
function ensureDocHasTheRightData(doc, expected) {
  ensureEqual(doc.name, expected.name);
  ensureEqual(doc.email, expected.email);

  //the password won't be hashed since It was hashed previously, hence they should be the same.
  ensureEqual(doc.password, expected.password);
  ensureEqual(doc.avatar, expected.avatar);
}
