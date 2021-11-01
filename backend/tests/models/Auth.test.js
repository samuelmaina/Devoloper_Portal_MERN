const Auth = require("../../src/models/Auth");
const { ensureEqual } = require("../utils/matchers");
const { includeSetUpAndTearDowns, clearDb } = require("./utils");

describe("Auth Model", () => {
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

    ensureEqual(doc.name, data.name);
    ensureEqual(doc.email, data.email);

    //the password won't be hashed since It was hashed previously.
    ensureEqual(doc.password, data.password);
  }, 20000);
});
