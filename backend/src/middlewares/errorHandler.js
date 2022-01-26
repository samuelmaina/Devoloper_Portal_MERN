const { Responder } = require("../utils");

module.exports = (app) => {
  const notFound = (error, req, res, next) => {
    try {
      console.error(error);
      return new Responder(res)
        .withStatusCode(500)
        .withMessage("Internal Server Error!")
        .send();
    } catch (err) {
      next(error);
    }
  };

  app.use(notFound);
};
