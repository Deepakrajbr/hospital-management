const express = require("express");
const mongoose = require("mongoose");
const Doctor = require("./models/doctor");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Doctor Service Running - CI/CD v2");
});

app.get("/api/doctors", async (req, res) => {
  try {
    const doctors = await Doctor.find().sort({ createdAt: -1 });

    res.json(doctors);
  } catch (err) {
    console.error("Failed to fetch doctors:", err.message);

    res.status(500).json({
      message: "Failed to fetch doctors"
    });
  }
});

app.post("/api/doctors", async (req, res) => {
  try {
    const { name, specialization } = req.body;

    if (!name || !specialization) {
      return res.status(400).json({
        message: "Name and specialization are required"
      });
    }

    const doctor = await Doctor.create({
      name,
      specialization
    });

    res.status(201).json(doctor);
  } catch (err) {
    console.error("Failed to create doctor:", err.message);

    res.status(500).json({
      message: "Failed to create doctor"
    });
  }
});

const PORT = process.env.PORT || 5002;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/doctor-db";

async function startServer() {
  try {
    await mongoose.connect(MONGO_URI);

    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`Doctor Service running on ${PORT}`);
    });
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
}

if (require.main === module) {
  startServer();
}

module.exports = app;