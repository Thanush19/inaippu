const express = require("express");
const userController = require("../controller/userController");

const router = express.Router();

// Registration
router.post("/register", userController.registerUser);

// Login
router.post("/login", userController.loginUser);

// Get all users
router.get("/getAllUsers", userController.getAllUsers);

module.exports = router;
