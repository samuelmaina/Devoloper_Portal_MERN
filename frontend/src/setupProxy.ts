const { createProxyMiddleware } = require("http-proxy-middleware");
const { TARTGET_URL } = require("./config");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: TARTGET_URL,
      changeOrigin: true,
    })
  );
};
