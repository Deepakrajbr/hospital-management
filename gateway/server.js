require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

// Allow requests from other origins (e.g., React dev server)
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Gateway running on port ${PORT}`);
});