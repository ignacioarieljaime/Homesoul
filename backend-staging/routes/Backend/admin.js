"use strict";
const controller = require("../../controller/Backend/adminController");
const express = require("express");
const router = express.Router();
const { Msg } = require("../../helpers/localization");
const { body, param, query } = require("express-validator");
const { authenticateAdmin, extendSession } = require("../../helpers/middleware");


router.get("/add", authenticateAdmin, extendSession, controller.form);
router.get("/edit/:adminId", authenticateAdmin, extendSession, controller.form);

router.post(
  "/add",
  authenticateAdmin,
  extendSession,
  body("firstName").not().isEmpty().withMessage(Msg.FIRST_NAME_IS_REQUIRED),
  body("lastName").not().isEmpty().withMessage(Msg.LAST_NAME_IS_REQUIRED),
  body("phoneNo").not().isEmpty().withMessage(Msg.PHONE_IS_REQUIRED),
  body("emailID")
    .not()
    .isEmpty()
    .withMessage(Msg.EMAIL_IS_REQUIRED)
    .isEmail()
    .withMessage(Msg.INVALID_EMAIL),
  body("password").not().isEmpty().withMessage(Msg.PASSWORD_IS_REQUIRED),
  body("confirmPassword").not().isEmpty().withMessage(Msg.CONFIRM_PASSWORD_IS_REQUIRED),
  // body("status").not().isEmpty().withMessage(Msg.STATUS_IS_REQUIRED),
  controller.add
);

router.get("", authenticateAdmin, controller.list);
router.get("/load-list", authenticateAdmin, controller.getList);

router.post(
  "/update/:id",
  authenticateAdmin,
  extendSession,
  body("firstName").not().isEmpty().withMessage(Msg.FIRST_NAME_IS_REQUIRED),
  body("lastName").not().isEmpty().withMessage(Msg.LAST_NAME_IS_REQUIRED),
  body("emailID")
    .not()
    .isEmpty()
    .withMessage(Msg.EMAIL_IS_REQUIRED)
    .isEmail()
    .withMessage(Msg.INVALID_EMAIL),
    body("phoneNo").not().isEmpty().withMessage(Msg.PHONE_IS_REQUIRED),
  body("password").optional(),
  body("confirmPassword").optional(),
  controller.update
);

router.post(
  "/delete",
  authenticateAdmin,
  extendSession,
  controller.delete
);

module.exports = router;
