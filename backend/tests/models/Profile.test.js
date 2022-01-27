const { Profile } = require("../../src/models");
const { ensureEqual, ensureNull } = require("../utils/matchers");
const {
  includeSetUpAndTearDowns,
  clearDb,
  generateRandomMongooseId,
} = require("./utils");

describe("Profile Model", () => {
  includeSetUpAndTearDowns();
  afterEach(async () => {
    await clearDb();
    it("createOne", async () => {
      const profileOne = {
        user: generateRandomMongooseId(),
        handle: "some/path/to/somewhere",
        company: "abc",
        website: "www.example.com",
        location: "test_location",
        status: "junior",
        skills: ["html, css, node.js, java"],
        bio: "Sample text that will act as bio.",
        githubusername: "github/johndoe",
        experience: [
          {
            tille: "junior dev",
            company: "aura",
            location: "nairobi",
            from: new Date("December 17, 2020"),
            to: new Date("December 25, 2021"),
            decription: "The good company",
          },
        ],
        education: [
          {
            school: "Moi University ",
            fieldOfStudy: "Computer Science",
            location: "Uasin Gishu",
            from: new Date("December 17, 2020"),
            to: new Date("December 25, 2021"),
            decription: "The good school",
          },
        ],
      };
    });
  });
});
