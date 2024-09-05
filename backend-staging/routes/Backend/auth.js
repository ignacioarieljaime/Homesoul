"use strict";
const controller = require("../../controller/Backend/authController");
const express = require("express");
const { authenticateAdmin } = require("../../helpers/middleware");
const router = express.Router();

router.get("/register", controller.signupForm);
router.post("/register-submit", controller.signup);

router.get("/", controller.loginForm);
router.post("/login-submit", controller.login);
router.get("/logout", authenticateAdmin, controller.logout);

module.exports = router;
