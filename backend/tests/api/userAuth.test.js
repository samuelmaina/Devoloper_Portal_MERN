const request = require("supertest");
const { BASE_URL, PORT } = require("../../src/config");
const { UnVerified, User, TokenGenerator } = require("../../src/models");
const { clearDb } = require("../models/utils");
const { ensureNotNull, ensureNull } = require("../utils/matchers");

const {
  closeApp,
  startApp,
  ensureHasStatusAndError,
  ensureHasStatusAndMessage,
  Requester,
} = require("./utils");

describe(" User Auth Tests", () => {
  let requester;

  beforeAll(async () => {
    const app = await startApp(PORT);
    requester = new Requester(app);
  });
  afterAll(async () => {
    await closeApp();
  });
  afterEach(async () => {
    await clearDb();
  });

  const base = "/api/auth/";
  describe("Sign Up", () => {
    const url = base + "sign-up/user";
    describe("should refuse when an email is taken", () => {
      it("for unverified account", async () => {
        const data = {
          name: "John Doe",
          email: "example",
          password: "pa55word?",
          avatar: "link/to/some/email",
        };
        await UnVerified.createOne(data);

        const res = await requester.makePostRequest(url, data);

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
        const res = await requester.makePostRequest(url, data);
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
        await requester.makePostRequest(url, data);

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
        const res = await requester.makePostRequest(url, data);
        ensureHasStatusAndMessage(
          res,
          201,
          "Sign Up successful.A link has been sent to your email. Click on it to verify your account."
        );
      });
    });

    describe("should allow verfication of email", () => {
      it("for the correct link", async () => {
        //simulate previous sign up without the sending of emails.
        const data = {
          name: "John Doe",
          email: "samuelmayna@gmail.com",
          password: "HashedPa55word?",
          avatar: "link/to/some/email",
        };

        await UnVerified.createOne(data);
        const tokenDetails = await TokenGenerator.createOne(data.email);
        const link = base + `verify/${tokenDetails.token}`;

        const res = await requester.makeGetRequest(link);

        //ensure that the token is deleted from the database.
        ensureHasStatusAndMessage(res, 201, "Email verfication successful.");
        const savedToken = await TokenGenerator.findOne({
          requester: data.email,
        });
        ensureNull(savedToken);
      });

      it.only("for the incorrect  link", async () => {
        const token =
          "sjdkfjdkjfkdjfdfkldjfkldjflkdjlfkjdklfjdklfjdkljfkljlkfd";
        const link = base + `verify/${token}`;

        const res = await requester.makeGetRequest(link);

        //ensure that the token is deleted from the database.
        ensureHasStatusAndMessage(res, 403, "Email verfication failed.");
      });
    });
  });

  describe("Sign Up", () => {
    const url = base + "sign-up/user";
    describe("should refuse when an email is taken", () => {
      it("for unverified account", async () => {
        const data = {
          name: "John Doe",
          email: "example",
          password: "pa55word?",
          avatar: "link/to/some/email",
        };
        await UnVerified.createOne(data);

        const res = await requester.makePostRequest(url, data);

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
        const res = await requester.makePostRequest(url, data);
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
        await requester.makePostRequest(url, data);

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
        const res = await requester.makePostRequest(url, data);
        ensureHasStatusAndMessage(
          res,
          201,
          "Sign Up successful.A link has been sent to your email. Click on it to verify your account."
        );
      });
    });

    describe("should allow verfication of email", () => {
      it("for the correct link", async () => {
        //simulate previous sign up without the sending of emails.
        const data = {
          name: "John Doe",
          email: "samuelmayna@gmail.com",
          password: "HashedPa55word?",
          avatar: "link/to/some/email",
        };

        await UnVerified.createOne(data);
        const tokenDetails = await TokenGenerator.createOne(data.email);
        const link = base + `verify/${tokenDetails.token}`;

        const res = await requester.makeGetRequest(link);

        //ensure that the token is deleted from the database.
        ensureHasStatusAndMessage(res, 201, "Email verfication successful.");
        const savedToken = await TokenGenerator.findOne({
          requester: data.email,
        });
        ensureNull(savedToken);
      });

      it.only("for the incorrect  link", async () => {
        const token =
          "sjdkfjdkjfkdjfdfkldjfkldjflkdjlfkjdklfjdklfjdkljfkljlkfd";
        const link = base + `verify/${token}`;

        const res = await requester.makeGetRequest(link);

        //ensure that the token is deleted from the database.
        ensureHasStatusAndMessage(res, 403, "Email verfication failed.");
      });
    });
  });
});
