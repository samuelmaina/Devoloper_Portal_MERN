const Auth = require("../../src/models/Auth");

const { hash } = require("bcrypt");
const { ensureEqual, ensureNull } = require("../utils/matchers");
const { includeSetUpAndTearDowns, clearDb } = require("./utils");

const plain = "HashedPa55word?";
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

    ensureDocHasTheRightData(doc, data);
  });
  it("findOneByEmail should return a doc with the given email", async () => {
    const data = await createTestDocs();
    const data3 = data.data3;
    const found = await Auth.findOneByEmail(data3.email);
    ensureDocHasTheRightData(found, data3);
  });

  describe.only("findOneWithCredentials", () => {
    let data;

    beforeAll(async () => {
      data = await createTestDocs();
    });
    it("should return doc when both email and password are okay", async () => {
      const data3 = data.data3;
      const { email } = data3;
      const doc = await Auth.findOneWithCredentials(email, plain);
      ensureDocHasTheRightData(doc, data3);
    });
    it("should return null when email is wrong", async () => {
      const doc = await Auth.findOneWithCredentials("some@email.com", plain);
      ensureNull(doc);
    });
    it("should return null  when password is wrong", async () => {
      const data3 = data.data3;
      const doc = await Auth.findOneWithCredentials(
        data3.email,
        "randompassword"
      );
      ensureNull(doc);
    });
  });
});
function ensureDocHasTheRightData(doc, expected) {
  ensureEqual(doc.name, expected.name);
  ensureEqual(doc.email, expected.email);

  //the password won't be hashed since It was hashed previously, hence they should be the same.
  ensureEqual(doc.password, expected.password);
  ensureEqual(doc.avatar, expected.avatar);
}
async function createTestDocs() {
  const password = await hash(plain, 12);
  const data1 = {
    name: "Jonn Doe",
    email: "test1@test.com",
    password,
    avatar: "/path/to/email/avatar",
  };
  const data2 = {
    name: "Jonn Doe",
    email: "test2@test.com",
    password,
    avatar: "/path/to/email/avatar",
  };

  const data3 = {
    name: "Jonn Doe",
    email: "test3@test.com",
    password,
    avatar: "/path/to/email/avatar",
  };
  await Auth.createOne(data1);
  await Auth.createOne(data2);
  await Auth.createOne(data3);
  return { data1, data2, data3 };
}
