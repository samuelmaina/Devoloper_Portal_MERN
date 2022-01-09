const { Responder } = require("../utils");

module.exports = (app) => {
  const notFound = (req, res, next) => {
    try {
      return new Responder(res)
        .withStatusCode(404)
        .withMessage("Page not found.")
        .send();
    } catch (err) {
      next(error);
    }
  };

  app.use(notFound);
};
