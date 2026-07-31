require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Auth Service Running");
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Auth Service running on ${PORT}`);
});