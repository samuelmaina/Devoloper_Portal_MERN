import { NextFunction, Request, Response } from "express";
import { Router } from "express-serve-static-core";

import { Responder } from "../utils";

export default (app: Router) => {
  const notFound = (req: Request, res: Response, next: NextFunction) => {
    try {
      return new Responder(res)
        .withStatusCode(404)
        .withMessage("Page not found.")
        .send();
    } catch (err: any) {
      next(err);
    }
  };

  app.use(notFound);
};
