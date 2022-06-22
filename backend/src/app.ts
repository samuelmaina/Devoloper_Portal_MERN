import express from "express";

import path from "path";
import { NODE_ENV } from "./config";
import routes from "./routes/api";

// const { notFound, errorHandler } = require("./middlewares");

const app = express();

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
// notFound(app);
// errorHandler(app);

if (NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend", "build")));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
  });
}
export default app;
