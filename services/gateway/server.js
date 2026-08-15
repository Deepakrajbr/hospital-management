const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

const PORT = process.env.PORT || 5000;

const AUTH_SERVICE_URL =
  process.env.AUTH_SERVICE_URL || "http://localhost:5001";

const DOCTOR_SERVICE_URL =
  process.env.DOCTOR_SERVICE_URL || "http://localhost:5002";

app.get("/", (req, res) => {
  res.json({
    message: "API Gateway Running"
  });
});

app.use(
  "/api/auth",
  createProxyMiddleware({
    target: AUTH_SERVICE_URL,
    changeOrigin: true
  })
);

app.use(
  "/api/doctors",
  createProxyMiddleware({
    target: DOCTOR_SERVICE_URL,
    changeOrigin: true
  })
);

app.listen(PORT, () => {
  console.log(`API Gateway running on ${PORT}`);
  console.log(`Auth Service: ${AUTH_SERVICE_URL}`);
  console.log(`Doctor Service: ${DOCTOR_SERVICE_URL}`);
});