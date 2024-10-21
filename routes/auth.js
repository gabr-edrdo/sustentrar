const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Desabilitado até precisar
// router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
