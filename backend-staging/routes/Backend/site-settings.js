"use strict";
const controller = require("../../controller/Backend/siteSettingsController");
const express = require("express");
const router = express.Router();
const { authenticateAdmin, extendSession } = require("../../helpers/middleware");


router.get("/", authenticateAdmin, extendSession, controller.form);

router.post(
    "/save",
    authenticateAdmin,
    controller.save
  );

module.exports = router;
