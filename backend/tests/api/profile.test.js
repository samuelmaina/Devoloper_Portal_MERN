const { PORT } = require("../../src/config");

const { UnVerified, User, TokenGenerator, Auth } = require("../../src/models");
const { clearDb } = require("../models/utils");
const {
  ensureNotNull,
  ensureNull,
  ensureEqual,
  ensureValueGreaterThanOrEqual,
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

  describe("get current profile", () => {
    const url = "/api/profile/";
    it("should refuse when the user is not logged in", async () => {
      token = "Bearer abkljrklejklejrkljeklrejjrklejr";
      const res = await requester.makeGetRequest(url, { token });
      ensureEqual(res.status, 401);
    });
  });
});
