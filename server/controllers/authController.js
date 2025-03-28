const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const passport = require("passport");
// const { v4: uuidv4 } = require("uuid");
const { User } = require("../models");
const generateCode = require("../utils/generateCode");

const {
  errorMessages,
  handleError,
  handleBadRequest,
  handleSuccess,
  handleUnauthorized,
  handleNotFound,
} = require("./errorController");

const { sendResetCode } = require("../services/emailService");

const SECRET_KEY = process.env.SECRET_KEY;

// Signup Controller

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return handleBadRequest(res, null, errorMessages.MISSING_FIELDS);
    }
    if (!email) {
      return handleBadRequest(res, null, errorMessages.INVALID_EMAIL);
    }
    if (!password) {
      return handleBadRequest(res, null, errorMessages.WEAK_PASSWORD);
    }

    // Check if username or email already exists

    const existingUserByUsername = await User.findOne({ where: { name } });

    const existingUserByEmail = await User.findOne({ where: { email } });

    if (existingUserByUsername) {
      return handleBadRequest(res, null, errorMessages.USERNAME_TAKEN);
    }

    if (existingUserByEmail) {
      return handleBadRequest(res, null, errorMessages.EMAIL_REGISTERED);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    // Create and save the new user

    const savedUser = await User.create({
      name,
      email,
      passwordHash: hashedPassword,
    });

    return handleSuccess(
      res,
      "User created successfully",
      { user: { name: savedUser.name } },
      201
    );
  } catch (error) {
    return handleError(res, error, errorMessages.ERROR_CREATING_USER);
  }
};

// Signin Controller

exports.login = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    if (!identifier || !password) {
      return handleBadRequest(res, null, "Username and password required");
    }

    let user;
    if (identifier.includes("@")) {
      user = await User.findOne({ where: { email: identifier } });
    } else {
      user = await User.findOne({ where: { name: identifier } });
    }

    if (!user) {
      return handleUnauthorized(res, null, errorMessages.INVALID_CREDENTIALS);
    }

    // Compare using passwordHash

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      return handleUnauthorized(res, null, errorMessages.INVALID_CREDENTIALS);
    }

    const token = jwt.sign({ userId: user.id, name: user.name }, SECRET_KEY, {
      expiresIn: "1h",
      algorithm: "HS256",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV,
      sameSite: "strict",
      maxAge: 60 * 60 * 1000, // 1 hour expiration
    });

    res.json({
      message: "Login successful",
      token,
      user: { name: user.name, userId: user.id },
    });
  } catch (error) {
    return handleError(res, error, errorMessages.ERROR_CREATING_USER);
  }
};

// // OAuth Controllers for Google

// exports.googleAuth = passport.authenticate("google", {
//   scope: ["profile", "email"],
// });

// exports.googleCallback = (req, res) => {
//   if (!req.user.uuid) {
//     req.user.uuid = uuidv4();
//   }

//   const token = jwt.sign(
//     { userId: req.user.id, name: req.user.name },
//     SECRET_KEY,
//     { expiresIn: "1h", algorithm: "HS256" }
//   );

//   res.cookie("token", token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV,
//     sameSite: "strict",
//     maxAge: 60 * 60 * 1000, // 1 hour expiration
//   });

//   res.json({
//     message: "OAuth login successful",
//     token,
//     user: { name: req.user.name, userId: req.user.id },
//   });
// };

// Forgot Password Controller

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return handleBadRequest(res, null, "A valid email is required");
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return handleNotFound(res, null, errorMessages.USER_NOT_FOUND);
    }

    const otpCode = generateCode();

    const token = jwt.sign({ userId: user.id, otp: otpCode }, SECRET_KEY, {
      expiresIn: "5m", // 5 minutes expiration
    });

    res.cookie("resetToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV,
      sameSite: "strict",
      maxAge: 5 * 60 * 1000, // 5 minutes expiration
    });

    sendResetCode(email, otpCode).catch((err) => {
      console.error(errorMessages.RESET_EMAIL_ERROR, err);
    });

    return handleSuccess(res, "A reset code has been sent to your email.");
  } catch (error) {
    return handleError(res, error, errorMessages.SERVER_ERROR);
  }
};

// Reset Password Controller

exports.resetPassword = async (req, res) => {
  try {
    const { otp, newPassword } = req.body;
    const token = req.cookies.resetToken;

    if (!token) {
      return handleUnauthorized(res, null, errorMessages.RESET_TOKEN_MISSING);
    }

    let payload;
    try {
      payload = jwt.verify(token, SECRET_KEY);
    } catch (error) {
      return handleBadRequest(res, null, errorMessages.INVALID_RESET_TOKEN);
    }

    if (parseInt(otp, 10) !== payload.otp) {
      return handleBadRequest(res, null, errorMessages.INVALID_OTP);
    }

    if (!newPassword) {
      return handleBadRequest(res, null, errorMessages.WEAK_PASSWORD);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await User.update(
      { passwordHash: hashedPassword },
      { where: { id: payload.userId } }
    );

    res.clearCookie("resetToken");

    const updatedUser = await User.findOne({ where: { id: payload.userId } });

    return res
      .status(200)
      .json({ message: "Password updated successfully", user: updatedUser });
  } catch (error) {
    return handleError(res, error, errorMessages.SERVER_ERROR);
  }
};

//// Log out Controller

exports.logOut = async (req, res) => {
  try {
    if (!req.cookies.token) {
      return handleBadRequest(res, null, errorMessages.NO_ACTIVE_SESSION);
    }

    res.clearCookie("token");
    res.clearCookie("resetToken");
    return handleSuccess(res, "Logout successful");
  } catch (error) {
    return handleError(res, error, errorMessages.SERVER_ERROR);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    //  Used Sequelize's destroy()

    const deletionCount = await User.destroy({ where: { id } });

    // Check if any user was deleted

    if (deletionCount === 0) {
      return handleNotFound(res, null, errorMessages.USER_NOT_FOUND);
    }

    return handleSuccess(res, "User deleted successfully");
  } catch (error) {
    return handleError(res, error, errorMessages.SERVER_ERROR);
  }
};

// Get All Users Controller

exports.getAllUsers = async (req, res) => {
  try {
    //  Used Sequelize's findAll()

    const users = await User.findAll();
    return handleSuccess(res, users);
  } catch (error) {
    return handleError(res, error, errorMessages.SERVER_ERROR);
  }
};
