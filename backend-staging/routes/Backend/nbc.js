"use strict";
const express = require("express");
const router = express.Router();
const controller = require("../../controller/Backend/nbcController");
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
  body("nbcTierTitle").not().isEmpty().withMessage(Msg.NBC_IS_REQUIRED),
  body("ecPoints").not().isEmpty().withMessage(Msg.ECPOINTS_IS_REQUIRED),
  controller.add
);

router.get("/edit/:id", authenticateAdmin, extendSession, controller.form);

router.post(
  "/update/:id",
  authenticateAdmin,
  extendSession,
  body("nbcTierTitle").not().isEmpty().withMessage(Msg.NBC_IS_REQUIRED),
  body("ecPoints").not().isEmpty().withMessage(Msg.ECPOINTS_IS_REQUIRED),
  controller.update
);
router.get("/", authenticateAdmin, extendSession, controller.list);

router.get("/load-list", authenticateAdmin, extendSession, controller.getList);

router.post("/delete", authenticateAdmin, extendSession, controller.delete);

module.exports = router;
