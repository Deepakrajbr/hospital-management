const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5002;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/doctor-db";

app.get("/", (req, res) => {
  res.send("Doctor Service Running");
});

app.get("/api/doctors", async (req, res) => {
  res.json([
    {
      id: 1,
      name: "Dr. John",
      specialization: "Cardiology"
    },
    {
      id: 2,
      name: "Dr. Smith",
      specialization: "Neurology"
    }
  ]);
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`Doctor Service running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });