"use strict";
const controller = require("../../controller/Backend/indexController");
const express = require("express");
const { authenticateAdmin, extendSession } = require("../../helpers/middleware");
const router = express.Router();

router.get("/", authenticateAdmin, extendSession, controller.dashboard);

module.exports = router;
