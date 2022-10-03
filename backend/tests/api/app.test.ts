// import { PORT } from "../../src/config";
// import { clearDb } from "../models/utils";

// const {
//   closeApp,
//   startApp,
//   ensureHasStatusAndError,
//   ensureHasStatusAndMessage,
//   Requester,
// } = require("./utils");

// describe.skip("App tests", () => {
//   let requester;
//   beforeAll(async () => {
//     const app = await startApp(PORT);
//     requester = new Requester(app);
//   });
//   afterAll(async () => {
//     await closeApp();
//   });
//   afterEach(async () => {
//     await clearDb();
//   });

//   it("Should notify of non-existing url", async () => {
//     const res = await requester.makeGetRequest("/non/existing/url");
//     ensureHasStatusAndMessage(res, 404, "Page not found.");
//   });
// });
