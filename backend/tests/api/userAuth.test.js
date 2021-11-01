const request = require("supertest");
const { UnVerified, User } = require("../../src/models");
const Auth = require("../../src/models/Auth");

const { closeApp, startApp, ensureHasStatusAndError } = require("./utils");
const PORT = 8080;
describe(" User Auth Tests", () => {
  let app;

  beforeAll(async () => {
    app = await startApp(PORT);
  });
  afterAll(async () => {
    await closeApp();
  });
  describe("Sign Up", () => {
    const url = "/api/auth/user/sign-up";
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
          "Email already Taken. Please try another one."
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
          "Email already Taken. Please try another one."
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
