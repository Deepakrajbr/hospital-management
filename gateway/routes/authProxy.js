const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const router = express.Router();

router.use(
    "/",
    createProxyMiddleware({
        target: process.env.AUTH_SERVICE,
        changeOrigin: true
    })
);

module.exports = router;