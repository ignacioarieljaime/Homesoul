"use strict";
const express = require("express");
const router = express.Router();
const controller = require("../../controller/Backend/assemblyElementsController");
const { Msg } = require("../../helpers/localization");
const { body, param, query } = require("express-validator");
const {
    authenticateAdmin,
    extendSession,
} = require("../../helpers/middleware");

router.get("/add/:assemblyId", authenticateAdmin, extendSession, controller.form);
router.post(
    "/add/:assemblyId",
    authenticateAdmin,
    controller.add
);

router.get("/edit/:id/:assemblyId", authenticateAdmin, extendSession, controller.form);

router.post(
    "/update/:id/:assemblyId",
    authenticateAdmin,
    extendSession,
    controller.update
);
// router.get("/", authenticateAdmin, extendSession, controller.list);

// router.get("/load-list", authenticateAdmin, extendSession, controller.getList);

router.post("/delete/:assemblyId", authenticateAdmin, extendSession, controller.delete);

module.exports = router;
