// const { TokenGenerator } = require("../../src/models");
// const { ensureEqual, ensureNull } = require("../utils/matchers");

// const { includeSetUpAndTearDowns, clearDb } = require("./utils");
// const { token } = require("../../src/constraints");
// const { TOKEN_VALIDITY_IN_HOURS } = require("../../src/config");

// describe.skip("Token Generator", () => {
//   includeSetUpAndTearDowns();
//   // afterEach(async () => {
//   //   await clearDb();
//   // });
//   describe("Statics", () => {
//     describe("createOne", () => {
//       it("should create one doc for correct data", async () => {
//         const email = "unique@email.com";
//         const doc = await TokenGenerator.createOne(email);

//         console.log(doc);
//         ensureEqual(doc.requester, email);
//         ensureEqual(doc.token.length, token.howLong.exact);
//       });
//     });

//     describe("findDetailsByToken", () => {
//       it("should find for  valid unexpired token", async () => {
//         const email = "unique@email.com";
//         const doc = await TokenGenerator.createOne(email);
//         const token = doc.token;
//         const found = await TokenGenerator.findTokenDetailsByToken(token);
//         ensureEqual(found.requester, email);
//       });

//       it("should not find for expired token", async () => {
//         const email = "unique@email.com";
//         const doc = await TokenGenerator.createOne(email);

//         //make the token expired.
//         doc.expiryTime =
//           //reverse the saved time by the validity period.give an allowance of 20 milliseconds for code execution.
//           doc.expiryTime - (TOKEN_VALIDITY_IN_HOURS * 3600 * 1000 + 20);
//         await doc.save();
//         const token = doc.token;
//         const found = await TokenGenerator.findTokenDetailsByToken(token);
//         ensureNull(found);
//       });

//       describe("Should not find when the requester and the token don't match", () => {
//         it("when the token is wrong ", async () => {
//           const email = "unique@email.com";
//           const doc = await TokenGenerator.createOne(email);
//           const token = "somerandomtoken134309343534343434343";
//           const found = await TokenGenerator.findTokenDetailsByToken(token);
//           ensureNull(found);
//         });

//         it("when the requester is wrong ", async () => {
//           const email = "unique@email.com";
//           const doc = await TokenGenerator.createOne(email);
//           const token = doc.token;
//           const requester = "someemail@email.com";
//           const found = await TokenGenerator.findTokenDetailsByToken(token);
//           ensureNull(found);
//         });

//         it("when the both are wrong", async () => {
//           const email = "unique@email.com";
//           const doc = await TokenGenerator.createOne(email);
//           const token = "somerandomrequester";
//           const requester = "someemail@email.com";
//           const found = await TokenGenerator.findTokenDetailsByToken(token);
//           ensureNull(found);
//         });
//       });
//     });
//   });

//   describe("Methods", () => {
//     describe("delete", () => {
//       it("should delete tokenDetails", async () => {
//         const email = "unique@email.com";
//         const doc = await TokenGenerator.createOne(email);
//         await doc.delete();
//         //only one doc was created in the db, if the doc is deleted no
//         //doc will have remained in the db.
//         ensureEqual((await TokenGenerator.find()).length, 0);
//       });
//     });
//   });
// });
