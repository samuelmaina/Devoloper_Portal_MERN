// import { PORT } from "../../src/config";

// import bcrypt from "bcrypt";

// import { UnVerified, User, TokenGenerator, Auth } from "../../src/models";
// import { clearDb } from "../models/utils";

// import {
//   ensureNotNull,
//   ensureNull,
//   ensureEqual,
//   ensureValueGreaterThanOrEqual,
// } from "../utils/matchers";

// import {
//   closeApp,
//   startApp,
//   ensureHasStatusAndError,
//   ensureHasStatusAndMessage,
//   ensureResHasStatusCodeAndFieldData,
//   ensureResHasStatusCodeAndProp,
//   Requester,
// } from "./utils";

// describe.skip(" User Auth Tests", () => {
//   let requester: any;

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

//   const plain = "Password?5";
//   const hashed = bcrypt.hashSync(plain, 12);
//   const base = "/api/auth/";
//   describe("Sign Up", () => {
//     const url = base + "sign-up/user";
//     describe("should refuse when an email is taken", () => {
//       it("for unverified account", async () => {
//         const data = {
//           name: "John Doe",
//           email: "example",
//           password: "pa55word?",
//           avatar: "link/to/some/email",
//           type: "user",
//         };
//         await UnVerified.createOne(data);

//         const res = await requester.makePostRequest(url, data);

//         ensureHasStatusAndError(
//           res,
//           401,
//           "Email not verified. Please verify Email by clicking the link sent to your inbox."
//         );
//       });

//       it("for existing account", async () => {
//         const data = {
//           name: "John Doe",
//           email: "example",
//           password: "HashedPa55word?",
//           avatar: "link/to/some/email",
//         };

//         await User.createOne(data);
//         const res = await requester.makePostRequest(url, data);
//         ensureHasStatusAndError(
//           res,
//           401,
//           "Email already taken. Please try another one."
//         );
//       });
//     });
//     describe("should sign up when the email does not exist", () => {
//       it("ensure that token to verify the email is generated", async () => {
//         const data = {
//           name: "John Doe",
//           email: "samuelmayna@gmail.com",
//           password: "pa55word?",
//           avatar: "link/to/some/email",
//         };
//         await requester.makePostRequest(url, data);

//         //ensure that the token is generated.
//         const tokenDetails = await TokenGenerator.findOne({
//           requester: data.email,
//         });

//         ensureNotNull(tokenDetails);
//       });

//       it("that that the email is sent and a message about verification is sent ", async () => {
//         const data = {
//           name: "John Doe",
//           email: "samuelmayna@gmail.com",
//           password: "pa55word?",
//           avatar: "link/to/some/email",
//         };

//         //if error is not thrown , the email has been sent.
//         const res = await requester.makePostRequest(url, data);
//         ensureHasStatusAndMessage(
//           res,
//           201,
//           "Sign Up successful.A link has been sent to your email. Click on it to verify your account."
//         );
//       });

//       it("ensure that the that the data is saved in the UnVerified collection in the Database. ", async () => {
//         const data = {
//           name: "John Doe",
//           email: "samuelmayna@gmail.com",
//           password: "pa55word?",
//           avatar: "link/to/some/email",
//         };

//         await requester.makePostRequest(url, data);

//         const found: any = await UnVerified.findOne({ email: data.email });

//         ensureNotNull(found);
//         ensureEqual(found.name, data.name);
//         ensureEqual(found.email, data.email);
//       });
//     });

//     describe("should allow verfication of email", () => {
//       it("for the correct link", async () => {
//         //a link is sent in an email.
//         //for the test the link is going to be followed
//         //simulate previous sign up without the sending of emails.
//         const data = {
//           name: "John Doe",
//           email: "samuelmayna@gmail.com",
//           password: "HashedPa55word?",
//           avatar: "link/to/some/email",
//           type: "user",
//         };

//         //@ts-ignore
//         await UnVerified.createOne(data);
//         //@ts-ignore
//         const tokenDetails = await TokenGenerator.createOne(data.email);

//         const link = base + `verify/${tokenDetails.token}`;

//         const res = await requester.makeGetRequest(link);

//         ensureHasStatusAndMessage(res, 201, "Email verfication successful.");
//         //ensure that the token is deleted from the database.
//         const savedToken = await TokenGenerator.findOne({
//           requester: data.email,
//         });
//         ensureNull(savedToken);

//         const saved = await User.findOne({ email: data.email });

//         //ensure that the data is saved to the right channel.
//         ensureNotNull(saved);
//         ensureEqual(saved.email, data.email);

//         //ensure that the  data is deleted from the unverified model.
//         const retrieved = await UnVerified.findOne({ email: data.email });
//         ensureNull(retrieved);
//       });

//       it("should fail for incorrect  link", async () => {
//         const token =
//           "sjdkfjdkjfkdjfdfkldjfkldjflkdjlfkjdklfjdklfjdkljfkljlkfd";
//         const link = base + `verify/${token}`;
//         const res = await requester.makeGetRequest(link);
//         ensureHasStatusAndError(res, 403, "Email verfication failed.");
//       });
//     });
//   });

//   describe("Login", () => {
//     const data = {
//       email: "johndoe@email.com",
//       name: "John Doe",
//       password: hashed,
//       avatar: "path/to/some/email",
//     };
//     const url = base + "log-in/user";
//     beforeAll(async () => {
//       await User.createOne(data);
//     });
//     afterAll(async () => {
//       await clearDb();
//     });
//     it("should login for correct data", async () => {
//       //put the password as the normal password.
//       data.password = plain;
//       const res = await requester.makePostRequest(url, data);
//       ensureResHasStatusCodeAndProp(res, 201, "token");
//       const token = res.body.token;
//       ensureValueGreaterThanOrEqual(token.length, 41);
//       //ensure that the token has bearer in front.
//       const bearer = token.slice(0, 6);
//       ensureEqual(bearer, "Bearer");
//     });
//     it("should return error if email or password is incorrect", async () => {
//       const invalid = {
//         email: "someemail@email.com",
//         password: data.password,
//       };
//       const error = "Invalid Email or Password";
//       const res = await requester.makePostRequest(url, invalid);
//       ensureHasStatusAndError(res, 401, error);
//     });
//   });
// });
