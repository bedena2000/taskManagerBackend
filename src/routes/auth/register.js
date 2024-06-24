const express = require("express");
const router = express.Router();
const User = require("../../schemas/User");
const bcrypt = require("bcryptjs");

const AuthenticationValidator = require("../../validation/AuthenticationValidator");

router.post("/register", async (req, res) => {
  try {
    // Validation
    const credentials = req.body;
    console.log(credentials);

    const credentialsResult = await AuthenticationValidator.checkCredentials(
      credentials
    );
    const sameUser = await AuthenticationValidator.checkEmailExists(
      credentials.email
    );

    if (credentialsResult.status === "error") {
      return res.status(404).send({
        message: credentialsResult.message,
      });
    }

    if (sameUser.status === "error") {
      return res.status(404).send({
        message: sameUser.message,
      });
    }

    // Authentication Logic
    const hashedPassword = await bcrypt.hash(credentials.password, 10);
    const user = new User({
      username: credentials.username,
      email: credentials.email,
      password: hashedPassword,
    });

    if (!user) {
      return res.status(404).json({
        message: "something went wrong",
      });
    }
    await user.save();
    return res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    return res.status(404).json({
      message: "something went wrong",
    });
  }
});

module.exports = router;
