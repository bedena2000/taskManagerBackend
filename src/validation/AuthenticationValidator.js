const User = require("../schemas/User");
const validator = require("validator");

class AuthenticationValidator {
  static checkCredentials(credentials, res) {
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
  }

  static async checkEmailExists(email, res) {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (user) {
      return res.status(409).json({
        message: "email already exists",
      });
    }
  }

  static async checkLogin(credentials, res) {
    if (!credentials.username || !credentials.password) {
      return res.status(403).json({
        message: "please fill out all forms",
      });
    }

    if (!validator.isLength(credentials.username, { min: 4 })) {
      return res.status(403).json({
        message: "the name must be more than four characters long",
      });
    }
  }
}

module.exports = AuthenticationValidator;
