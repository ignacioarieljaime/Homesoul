"use strict";
const express = require("express");
const router = express.Router();
const controller = require("../../controller/Backend/leadsController");
const { Msg } = require("../../helpers/localization");
const { body, param, query } = require("express-validator");
const {
    authenticateAdmin,
    extendSession,
} = require("../../helpers/middleware");

router.get("/", authenticateAdmin, extendSession, controller.list);

router.get("/load-list", authenticateAdmin, extendSession, controller.getList);

router.post("/status-change", authenticateAdmin, extendSession, controller.statusChange)

module.exports = router;
