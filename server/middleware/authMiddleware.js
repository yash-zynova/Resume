const jwt = require("jsonwebtoken");
const { User } = require("../models");

const {
  handleUnauthorized,
  errorMessages,
} = require("../controllers/errorController");

const SECRET_KEY = process.env.SECRET_KEY;

const authMiddleware = async (req, res, next) => {
  // Retrieve the token from cookies

  const token = req.cookies.token;
  if (!token) {
    return handleUnauthorized(res, null, errorMessages.NO_ACTIVE_SESSION);
  }

  try {
    // Verify token and extract payload

    const payload = jwt.verify(token, SECRET_KEY);

    // Check if the user still exists in the database

    const user = await User.findOne({ where: { id: payload.userId } });
    if (!user) {
      // If user is not found, clear the token and return an error

      res.clearCookie("token");
      return handleUnauthorized(
        res,
        null,
        "User not found. Please sign in again."
      );
    }

    // Attach user info to request for further use in the controller

    req.user = user;
    next();
  } catch (error) {
    return handleUnauthorized(
      res,
      null,
      "Invalid token. Please sign in again."
    );
  }
};

module.exports = authMiddleware;
