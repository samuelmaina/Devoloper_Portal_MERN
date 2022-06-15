const { hash } = require("bcrypt");
const { PORT } = require("../../src/config");

const { User, Profile } = require("../../src/models");
const { clearDb, createTestDocs } = require("../models/utils");
const {
  ensureNotNull,
  ensureNull,
  ensureEqual,
  ensureValueGreaterThanOrEqual,
  ensureIdsEqual,
} = require("../utils/matchers");

const {
  closeApp,
  startApp,
  ensureHasStatusAndError,
  ensureHasStatusAndMessage,
  ensureResHasStatusCodeAndFieldData,
  ensureResHasStatusCodeAndProp,
  Requester,
} = require("./utils");

describe("Profile routers tests.", () => {
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

  describe("creating a new profile", () => {
    const url = "/api/profile/";
    it("should refuse when the user is not logged in", async () => {
      token = "Bearer abkljrklejklejrkljeklrejjrklejr";
      const res = await requester.makeAuthorizedPostRequest(url, token);
      ensureEqual(res.status, 401);
    });

    it("should create profile", async () => {
      const data = {
        handle: "handle1",
        company: "abc",
        website: "www.example.com",
        location: "test_location",
        status: "junior",
        skills: ["html, css, node.js, java"],
        bio: "Sample text that will act as bio.",
        githubusername: "github/johndoe",
        experience: [
          {
            title: "junior dev",
            company: "Aura Safira",
            location: "Nairobi",
            from: new Date("December 17, 2020"),
            to: new Date("December 25, 2021"),
            description: "The good company",
          },
        ],
        education: [
          {
            school: "Moi University ",
            fieldOfStudy: "Computer Science",
            location: "Uasin Gishu",
            from: new Date("December 17, 2020"),
            to: new Date("December 25, 2021"),
            description: "The good school",
          },
        ],
      };

      const { token, user } = await loginUser();
      const res = await requester.makeAuthorizedPostRequest(url, token, data);
      ensureHasStatusAndMessage(res, 200, "Profile created successfully.");

      const created = await Profile.findOneWithUserId(user.id);
      ensureNotNull(created);
      ensureEqual(String(created.user), String(user.id));
    });
  });

  describe("get current profile", () => {
    const url = "/api/profile/";
    it("should refuse when the user is not logged in", async () => {
      token = "Bearer abkljrklejklejrkljeklrejjrklejr";
      const res = await requester.makeAuthorizedGetRequest(url, token);
      ensureEqual(res.status, 401);
    });

    it("should return an notification message if the currrent user does not have a profile", async () => {
      const { token } = await loginUser();
      const res = await requester.makeAuthorizedGetRequest(url, token);
      ensureHasStatusAndError(
        res,
        404,
        "You don't have any profile yet.Consider creating one."
      );
    });

    it("return the profile details for the user if the profile exists.", async () => {
      const { token, user } = await loginUser();

      const data = {
        user: user.id,
        handle: "handle1",
        company: "abc",
        website: "www.example.com",
        location: "test_location",
        status: "junior",
        skills: ["html, css, node.js, java"],
        bio: "Sample text that will act as bio.",
        githubusername: "github/johndoe",
        experience: [
          {
            title: "junior dev",
            company: "Aura Safira",
            location: "Nairobi",
            from: new Date("December 17, 2020"),
            to: new Date("December 25, 2021"),
            description: "The good company",
          },
        ],
        education: [
          {
            school: "Moi University ",
            fieldOfStudy: "Computer Science",
            location: "Uasin Gishu",
            from: new Date("December 17, 2020"),
            to: new Date("December 25, 2021"),
            description: "The good school",
          },
        ],
      };

      await Profile.createOne(data);

      const res = await requester.makeAuthorizedGetRequest(url, token);
      ensureEqual(res.status, 200);
      ensureIdsEqual(res.body.user, user.id);
    });
  });

  async function loginUser() {
    const plain = "Pass55word??5";
    const data = {
      email: "johndoe@email.com",
      name: "John Doe",
      password: await hash(plain, 12),
      avatar: "path/to/some/email",
    };
    const user = await User.createOne(data);

    const url = "/api/auth/log-in/user";

    //revert data back to plain the the  password in the request will be a plain password.
    data.password = plain;

    const res = await requester.makePostRequest(url, data);
    return { token: res.body.token, user };
  }
});
