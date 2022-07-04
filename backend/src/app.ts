import express, { NextFunction, Request, Response } from "express";

import path from "path";
import { NODE_ENV } from "./config";
import routes from "./routes/api";

// const { notFound, errorHandler } = require("./middlewares");

const app: any = express();

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
  app.get("/*", (req: Request, res: Response, next: NextFunction) => {
    try {
      res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
    } catch (err: any) {
      next(err.message);
    }
  });
}
export default app;
