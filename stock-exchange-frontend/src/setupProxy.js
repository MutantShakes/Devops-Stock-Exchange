const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "http://192.168.49.2:30008",
            changeOrigin: true,
        })
    );
};
