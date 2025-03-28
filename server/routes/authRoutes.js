const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

// Route for Register User

router.post("/register", authController.registerUser);

// Route for Login User

router.post("/login", authController.login);

// Route for Forgot Password

router.post("/forgot", authController.forgotPassword);

// Route for Reset Password

router.post("/reset", authController.resetPassword);

// Route for Logout User

router.post("/logout", authMiddleware, authController.logOut);

// Route for Delete User

router.delete("/delete/:id", authController.deleteUser);

// Route for Get All Users

router.get("/users", authController.getAllUsers);

module.exports = router;
