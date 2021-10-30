const request = require("supertest");
const { UnVerified } = require("../../src/models");
const Auth = require("../../src/models/Auth");

const { closeApp, startApp, ensureHasStatusAndError } = require("./utils");
const PORT = 8080;
describe("Auth Tests", () => {
  let app;

  beforeAll(async () => {
    app = await startApp(PORT);
  });
  afterAll(async () => {
    await closeApp();
  });
  describe("Sign Up", () => {
    describe("should refuse when an email is taken", () => {
      it("for unverified account", async () => {
        const data = {
          name: "John Doe",
          email: "example",
          password: "pa55word?",
          avatar: "link/to/some/email",
        };
        await UnVerified.createOne(data);
        const url = "/api/auth/sign-up";

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
          password: "pa55word?",
          avatar: "link/to/some/email",
        };

        await Auth.createOne(data);
        const url = "/api/auth/sign-up";

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
