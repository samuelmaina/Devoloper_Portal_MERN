const express = require("express");

const app = express();

const routes = require("./routes/api");

app.use(
  express.urlencoded({
    extended: true,
    limit: "100kb",
  })
);
app.use(
  express.json({
    limit: "100Kb",
  })
);

app.use("/api", routes);
app.use(notFound);

module.exports = app;
