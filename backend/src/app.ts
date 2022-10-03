import express, { NextFunction, Request, Response, Express } from "express";

import path from "path";
import { NODE_ENV } from "./config";
import routes from "./routes/api";
import cors from "cors";
import { Responder } from "./utils";

const app: Express = express();

app.use(cors());

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

app.use(errorHandler);
renderBuildIfInProduction();

export default app;

function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);
  new Responder(res)
    .withError("Some Error occured. Plase try again later.")
    .withStatusCode(500)
    .send();
}

function renderBuildIfInProduction() {
  if (NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend", "build")));
    app.get("/*", (req: Request, res: Response, next: NextFunction) => {
      try {
        res.sendFile(
          path.join(__dirname, "../frontend", "build", "index.html")
        );
      } catch (err: any) {
        next(err.message);
      }
    });
  }
}
