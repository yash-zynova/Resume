const errorMessages = {
  MISSING_FIELDS: "Username, email and password are required",
  INVALID_EMAIL: "Invalid email address",
  WEAK_PASSWORD:
    "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
  USERNAME_TAKEN: "Username is already taken",
  EMAIL_REGISTERED: "Email is already registered",
  INVALID_CREDENTIALS: "Invalid username or password",
  RESET_TOKEN_MISSING: "Unauthorized: Reset token missing",
  INVALID_RESET_TOKEN: "Invalid or expired reset token",
  INVALID_OTP: "Invalid otp code",
  NO_ACTIVE_SESSION: "No active session found",
  SERVER_ERROR: "Server error occurred",
  USER_NOT_FOUND: "User not found",
  ERROR_CREATING_USER: "Error creating user",
  RESET_EMAIL_ERROR: "Error sending reset email:",
};

// Centralized error handler for server errors (defaults to 500)

const handleError = (res, error, customeMessage, statusCode = 500) => {
  console.error(customeMessage, error);
  return res.status(statusCode).json({ message: customeMessage });
};

// Centralized error handler for client errors (defaults to 400)

const handleBadRequest = (res, error, customMessage, statusCode = 400) => {
  console.error(customMessage, error);
  return res.status(statusCode).json({ message: customMessage });
};

// centralized handler for success responses (defaults to 200)

const handleSuccess = (res, message, data = {}, statusCode = 200) => {
  return res.status(statusCode).json({ message, ...data });
};

// centralized handler for unauthorized responses (defaults to 401)

const handleUnauthorized = (res, error, customMessage, statusCode = 401) => {
  console.error(customMessage, error);
  return res.status(statusCode).json({ message: customMessage });
};

// Centralized handler for "Not Found" responses (defaults to 404)

const handleNotFound = (res, error, customMessage, statusCode = 404) => {
  console.error(customMessage, error);
  return res.status(statusCode).json({ message: customMessage });
};

module.exports = {
  errorMessages,
  handleError,
  handleBadRequest,
  handleSuccess,
  handleUnauthorized,
  handleNotFound,
};
