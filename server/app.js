const express = require("express");
const cors = require("cors");
const { authenticateJWT } = require("./middleware/auth");
const authRoutes = require("./routes/auth");
const ExpressError = require("./expressError");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use auth routes without the authenticateJWT middleware
app.use("/auth", authRoutes);

// Apply the authenticateJWT middleware to other routes that require authentication
// For example:
// app.use("/protected-route", authenticateJWT, protectedRouteHandler);


// 404 handler
// app.use((req, res, next) => {
//   const err = new ExpressError("Not Found", 404);
//   next(err);
// });

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      message: err.message || "Internal Server Error",
      status: err.status || 500,
    },
  });
});


module.exports = app;
