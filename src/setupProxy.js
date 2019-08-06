const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    proxy("/sms", {
      target: "http://localhost:8080/sms/v2/",
      ws: true,
      changeOrigin: true,
      pathRewrite: {
        "^/sms": ""
      }
    })
  );
};