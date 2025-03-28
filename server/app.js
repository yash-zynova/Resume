const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/errorHandler");
const authRoutes = require("./routes/authRoutes");
const db = require("./models");

// Middleware

app.use(cors());
app.use(cookieParser());
app.use(express.json());

// API Routes

app.use("/api/auth", authRoutes);

// Global Error Handler

app.use(errorHandler);

// Sync the database

db.sequelize
  .sync()
  .then(() => console.log("Database synchronized"))
  .catch((err) => console.error("Error synchronizing database:", err));

module.exports = app;
