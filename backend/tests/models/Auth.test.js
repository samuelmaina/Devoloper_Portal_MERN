const { hash } = require("bcrypt");
const Auth = require("../../src/models/Auth");

const { ensureEqual, ensureNull, ensureTruthy } = require("../utils/matchers");
const {
  includeSetUpAndTearDowns,
  clearDb,
  createTestDocs,
} = require("./utils");

const plain = "pa55Word??";
describe.skip("Auth Model", () => {
  includeSetUpAndTearDowns();
  afterEach(async () => {
    await clearDb();
  });

  describe("Statics", () => {
    it("createOne should create a document for the auth model", async () => {
      const data = {
        name: "Jonn Doe",
        email: "test@test.com",
        password: plain,
        avatar: "/path/to/email/avatar",
      };
      const doc = await Auth.createOne(data);

      ensureDocHasTheRightData(doc, data);
    });

    describe("findOneByEmail", () => {
      it("should return  doc with the given email if the doc exists", async () => {
        const data = await createTestDocs();
        const data3 = data.data3;
        const found = await Auth.findOneByEmail(data3.email);
        ensureDocHasTheRightData(found, data3);
      });
      it("should return null when there is no doc with that email", async () => {
        await createTestDocs();
        const found = await Auth.findOneByEmail("someEmail@gmail.com");
        ensureNull(found);
      });
    });

    describe("findOneWithCredentials", () => {
      let data;

      let plain;
      beforeAll(async () => {
        data = await createTestDocs();
        plain = data.plain;
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
  describe("methods", () => {
    it("isPasswordCorrect", async () => {
      const plain = "Pa55word??";
      const hashed = await hash(plain, 12);
      let data1 = {
        name: "Jonn Doe",
        email: "test1@test.com",
        password: hashed,
        avatar: "/path/to/email/avatar1",
      };
      const doc = await Auth.createOne(data1);
      ensureTruthy(await doc.isPasswordCorrect(plain));
    });
  });
});
function ensureDocHasTheRightData(doc, expected) {
  ensureEqual(doc.name, expected.name);
  ensureEqual(doc.email, expected.email);

  //There will be not password hashing hence can use direct comparison. Hashed and unhashed
  //can't be compared by direct comparison.
  ensureEqual(doc.password, expected.password);
  ensureEqual(doc.avatar, expected.avatar);
}
