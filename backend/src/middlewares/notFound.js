const { Responder } = require("../utils");

module.export = (app) => {
  const notFound = (req, res, next) => {
    try {
      return new Responder(res)
        .withStatusCode(404)
        .withMessage("Page not found.");
    } catch (err) {
      next(error);
    }
  };

  app.use(notFound);
};
