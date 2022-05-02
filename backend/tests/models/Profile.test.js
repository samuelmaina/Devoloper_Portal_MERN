const { Profile } = require("../../src/models");
const { ensureEqual, ensureNull, ensureNotNull } = require("../utils/matchers");
const {
  includeSetUpAndTearDowns,
  clearDb,
  generateRandomMongooseId,
} = require("./utils");

describe("Profile Model", () => {
  includeSetUpAndTearDowns();
  afterEach(async () => {
    await clearDb();
  });

  describe("Statics", () => {
    it("createOne", async () => {
      const profileOne = returnProfileWithUserId(generateRandomMongooseId());

      const saved = await Profile.createOne(profileOne);
      ensureThatRetrievedDocHasAllData(profileOne, saved);
    });

    describe.only("findOneByUseId", () => {
      it("should return a profile for a userId if the profile exists", async () => {
        const userId1 = generateRandomMongooseId();
        const userId2 = generateRandomMongooseId();

        const profile1 = returnProfileWithUserId(userId1);
        const profile2 = returnProfileWithUserId(userId2);

        await Profile.createOne(profile1);
        await Profile.createOne(profile2);

        const found = await Profile.findOneWithUserId(userId1);
        ensureNotNull(found);
        ensureEqual(userId1, found.user);
      });

      it("should return null if the profile with the userId does not exists", async () => {
        const userId1 = generateRandomMongooseId();
        const userId2 = generateRandomMongooseId();

        const profile1 = returnProfileWithUserId(userId1);
        const profile2 = returnProfileWithUserId(userId2);

        await Profile.createOne(profile1);
        await Profile.createOne(profile2);

        const found = await Profile.findOneWithUserId(
          generateRandomMongooseId()
        );
        ensureNull(found);
      });
    });
  });
});

function ensureThatRetrievedDocHasAllData(profileData, savedDoc) {
  for (const key in profileData) {
    if (Object.hasOwnProperty.call(profileData, key)) {
      //education and experience need special checking.
      if (key === "education" || key == "experience") {
        let prop = profileData[key];
        for (let i = 0; i < prop.length; i++) {
          ensureAllfieldAreThere(prop[i], savedDoc[key][i]);
        }
        continue;
      }
      ensureEqual(profileData[key], savedDoc[key]);
    }
  }
}

function ensureAllfieldAreThere(expected, actual) {
  for (const key in expected) {
    if (expected.hasOwnProperty.call(expected, key)) {
      ensureEqual(actual[key], expected[key]);
    }
  }
}
function returnProfileWithUserId(userId) {
  return {
    user: userId,
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
        title: "junior dev",
        company: "aura",
        location: "nairobi",
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
}
