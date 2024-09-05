"use strict";
const express = require("express");
const router = express.Router();
const controller = require("../../controller/Backend/regionsController");
const { Msg } = require("../../helpers/localization");
const { body, param, query } = require("express-validator");
const {
  authenticateAdmin,
  extendSession,
} = require("../../helpers/middleware");

router.get("/add", authenticateAdmin, extendSession, controller.form);

router.post(
  "/add",
  authenticateAdmin,
  body("regionCode").not().isEmpty().withMessage(Msg.REGION_CODE_IS_REQUIRE),
  body("regionTitle").not().isEmpty().withMessage(Msg.REGION_TITLE_IS_REQUIRE),
  controller.add
);

router.get("/", authenticateAdmin, extendSession, controller.list);

router.get("/load-list", authenticateAdmin, extendSession, controller.getList);

router.get("/edit/:id", authenticateAdmin, extendSession, controller.form);

router.post(
  "/update/:id",
  authenticateAdmin,
  extendSession,
  body("regionCode").not().isEmpty().withMessage(Msg.REGION_CODE_IS_REQUIRE),
  body("regionTitle").not().isEmpty().withMessage(Msg.REGION_TITLE_IS_REQUIRE),
  controller.update
);

router.post("/delete", authenticateAdmin, extendSession, controller.delete);

module.exports = router;
