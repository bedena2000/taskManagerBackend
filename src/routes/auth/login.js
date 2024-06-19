const express = require("express");
const router = express.Router();
const User = require("../../schemas/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const AuthenticationValidator = require("../../validation/AuthenticationValidator");

router.get("/login", async (req, res) => {
  try {
    // Validation
    const credentials = req.body;
    AuthenticationValidator.checkLogin(credentials, res);

    // Login logic
    const user = await User.findOne({
      where: {
        username: credentials.username,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const passwordMatch = await bcrypt.compare(
      credentials.password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Authentication failed",
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      token,
    });

    // Token Generating
  } catch (error) {}
});

module.exports = router;
