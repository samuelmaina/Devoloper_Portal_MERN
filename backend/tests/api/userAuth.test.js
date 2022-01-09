const request = require("supertest");
const { UnVerified, User } = require("../../src/models");
const { clearDb } = require("../models/utils");

const { closeApp, startApp, ensureHasStatusAndError } = require("./utils");
const PORT = 8080;
describe.skip(" User Auth Tests", () => {
  let app;

  beforeAll(async () => {
    app = await startApp(PORT);
  });
  afterAll(async () => {
    await closeApp();
  });
  afterEach(async () => {
    await clearDb();
  });
  describe("Sign Up", () => {
    const url = "/api/auth/sign-up/user";
    describe("should refuse when an email is taken", () => {
      it("for unverified account", async () => {
        const data = {
          name: "John Doe",
          email: "example",
          password: "pa55word?",
          avatar: "link/to/some/email",
        };
        await UnVerified.createOne(data);

        const res = await makePostRequest(url, data);

        ensureHasStatusAndError(
          res,
          401,
          "Email not verified. Please verify Email by clicking the link sent to your inbox."
        );
      });

      it("for existing account", async () => {
        const data = {
          name: "John Doe",
          email: "example",
          password: "HashedPa55word?",
          avatar: "link/to/some/email",
        };

        await User.createOne(data);
        const res = await makePostRequest(url, data);
        ensureHasStatusAndError(
          res,
          401,
          "Email already taken. Please try another one."
        );
      });
    });
  });
  async function makePostRequest(url, body) {
    return await request(app).post(url).send(body);
  }
  async function makeGetRequest(url) {
    return await request(app).get(url);
  }
});
