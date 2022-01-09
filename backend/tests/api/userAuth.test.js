const request = require("supertest");
const { BASE_URL, PORT } = require("../../src/config");
const { UnVerified, User, TokenGenerator } = require("../../src/models");
const { clearDb } = require("../models/utils");
const { ensureNotNull } = require("../utils/matchers");

const {
  closeApp,
  startApp,
  ensureHasStatusAndError,
  ensureHasStatusAndMessage,
} = require("./utils");

describe(" User Auth Tests", () => {
  let app;

  beforeAll(async () => {
    console.log("This is the port,", PORT);
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
    describe("should sign up when the email does not exist", () => {
      it("ensure that token is generated", async () => {
        const data = {
          name: "John Doe",
          email: "samuelmayna@gmail.com",
          password: "pa55word?",
          avatar: "link/to/some/email",
        };
        await makePostRequest(url, data);

        //ensure that the token is generated.
        const tokenDetails = await TokenGenerator.findOne({
          requester: data.email,
        });

        ensureNotNull(tokenDetails);
      });

      it("that that the email is sent and a message about verification is sent ", async () => {
        const data = {
          name: "John Doe",
          email: "samuelmayna@gmail.com",
          password: "pa55word?",
          avatar: "link/to/some/email",
        };

        //if error is not thrown , the email has been sent.
        const res = await makePostRequest(url, data);
        ensureHasStatusAndMessage(
          res,
          201,
          "Sign Up successful.A link has been sent to your email. Click on it to verify your account."
        );
      });
    });

    describe("should allow verfication of email", () => {
      it.only("for the correct link", async () => {
        //simulate previous sign up without the sending of emails.
        const data = {
          name: "John Doe",
          email: "samuelmayna@gmail.com",
          password: "HashedPa55word?",
          avatar: "link/to/some/email",
        };

        await UnVerified.createOne(data);
        const tokenDetails = await TokenGenerator.createOne(data.email);
        const link = `${BASE_URL}/${tokenDetails.token}`;
        const res = await makeGetRequest(link);
        ensureHasStatusAndMessage(res, 201, "Email Verfication successful.");
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
