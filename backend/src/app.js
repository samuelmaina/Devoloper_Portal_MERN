const express = require("express");
const { NODE_ENV } = require("./config");
const { notFound, errorHandler } = require("./middlewares");

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
notFound(app);
errorHandler(app);

if (NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend", "build")));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
  });
}

module.exports = app;
