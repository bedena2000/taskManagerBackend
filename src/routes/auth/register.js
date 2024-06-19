const express = require("express");
const router = express.Router();
const User = require("../../schemas/User");
const validator = require("validator");

router.post("/register", async (req, res) => {
  // Validation
  const credentials = req.body;
  if (!credentials.username || !credentials.email || !credentials.password) {
    return res.status(403).json({
      message: "please fill out all forms",
    });
  }

  if (!validator.isLength(credentials.username, { min: 4 })) {
    return res.status(403).json({
      message: "the name must be more than four characters long",
    });
  }

  if (!validator.isLength(credentials.password, { min: 4 })) {
    return res.status(403).json({
      message: "password must be more than four characters long",
    });
  }

  if (!validator.isEmail(credentials.email)) {
    return res.status(403).json({
      message: "invalid e-mail",
    });
  }
});

module.exports = router;
