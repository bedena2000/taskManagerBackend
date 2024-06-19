const express = require("express");
const router = express.Router();
const User = require("../../schemas/User");
const bcrypt = require("bcryptjs");

const AuthenticationValidator = require("../../validation/AuthenticationValidator");

router.post("/register", async (req, res) => {
  try {
    // Validation
    const credentials = req.body;
    AuthenticationValidator.checkCredentials(credentials, res);
    AuthenticationValidator.checkEmailExists(credentials.email, res);

    // Authentication Logic
    const hashedPassword = await bcrypt.hash(credentials.password, 10);
    const user = new User({
      username: credentials.username,
      email: credentials.email,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    return res.status(404).json({
      message: "something went wrong",
    });
  }
});

module.exports = router;
