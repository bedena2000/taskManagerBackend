const User = require("../schemas/User");
const validator = require("validator");

class AuthenticationValidator {
  static checkCredentials(credentials) {
    if (!credentials.username || !credentials.email || !credentials.password) {
      return {
        status: "error",
        message: "please fill out all forms",
      };
    }

    if (!validator.isLength(credentials.username, { min: 4 })) {
      return {
        status: "error",
        message: "the name must be more than four characters long",
      };
    }

    if (!validator.isLength(credentials.password, { min: 4 })) {
      return {
        status: "error",
        message: "password must be more than four characters long",
      };
    }

    if (!validator.isEmail(credentials.email)) {
      return {
        status: "error",
        message: "invalid e-mail",
      };
    }

    return {
      status: "okay",
    };
  }

  static async checkEmailExists(email) {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (user) {
      return {
        status: "error",
        message: "email already exists",
      };
    }

    return {
      status: "okay",
    };
  }

  static async checkLogin(credentials) {
    if (!credentials.username || !credentials.password) {
      return {
        status: "error",
        message: "please fill out all forms",
      };
    }

    if (!validator.isLength(credentials.username, { min: 4 })) {
      return {
        status: "error",
        message: "the name must be more than four characters long",
      };
    }

    return {
      status: "okay",
    };
  }
}

module.exports = AuthenticationValidator;
