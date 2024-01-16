const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authenticateJWT } = require("../middleware/auth");
const User = require("../models/user");

const router = express.Router();

router.post("/signup", async (req, res, next) => {
  console.log(req.body);
  try {
    const { email, password, your_name } = req.body;

    // Check if the email is already registered
    console.log("Check if user exist");
    const existingUser = await User.get(email);
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered" });
    } else {
      const newUser = await User.register({ email, password, your_name });

      // Optionally, you can generate and send a JWT token for immediate login after signup
      const token = jwt.sign({ id: newUser.email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      return res.json({ success: true, token });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    // Extract email and password from request body
    const { email, password } = req.body;

    // Validate input: Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Authenticate the user
    const user = await User.authenticate(email, password);
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate and send a JWT token for successful login
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.json({ success: true, token });
  } catch (error) {
    // Log the error for server-side inspection
    console.error("Login Error:", error);

    // Send a generic error response
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/profile", authenticateJWT, async (req, res, next) => {
  try {
    const { email } = req.user;

    // Fetch user profile
    const userProfile = await User.get(email);

    return res.json({ success: true, profile: userProfile });
  } catch (error) {
    //next(error);
    console.error("Profile Error:", error);

    // Send a generic error response
    return res.status(500).json({ error: "Internal server error" });
  }
});

// In your routes file (e.g., auth.js)
router.post("/validateToken", authenticateJWT, (req, res) => {
  const token = req.body.token;

  if (!token) {
    return res.status(400).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ isValid: false });
    }

    // Token is valid
    return res.json({ isValid: true });
  });
});

module.exports = router;
