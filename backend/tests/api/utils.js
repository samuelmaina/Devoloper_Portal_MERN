const app = require("../../src/app");
const { connectToTestDb, disconnectFromTestDb } = require("../models/utils");
const { ensureEqual } = require("../utils/matchers");

let server;

exports.startApp = async (PORT) => {
  await connectToTestDb();
  server = app.listen(PORT);
  return server;
};
exports.closeApp = async () => {
  if (!server) {
    throw new Error("Server not started, hence can't close it");
  }
  server.close((err) => {
    if (err) {
      throw new Error(err);
      //although the server unlistened from the current port, it is still running,
      //and jest will warn of some unstopped operations.
    }
  });
  await disconnectFromTestDb();
};

exports.ensureHasStatusAndError = (res, status, error) => {
  ensureEqual(res.body.error, error);
  ensureEqual(res.status, status);
};
