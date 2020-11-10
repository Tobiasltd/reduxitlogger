const express = require("express");
const connectDB = require("./config/db");
const colors = require("colors");
const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.json({ msg: "Welcome to the it logger api" }));

// Define Routes
app.use("/api/techs", require("./routes/techs"));
app.use("/api/logs", require("./routes/logs"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`.cyan));
