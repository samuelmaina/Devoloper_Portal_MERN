const app = require("./app");
const { MONGO_URI, PORT } = require("./src/config");
const { connectToDb } = require("./src/models/utils");

connectToDb(MONGO_URI)
  .then(() => {
    app.listen(PORT);
  })
  .catch((err) => {
    console.log(err);
    throw new Error(err);
  });
