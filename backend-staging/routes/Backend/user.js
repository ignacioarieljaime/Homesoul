"use strict";
const controller = require("../../controller/Backend/userController");
const express = require("express");
const router = express.Router();
const { Msg } = require("../../helpers/localization");
const { body, param, query } = require("express-validator");
const { authenticateAdmin, extendSession } = require("../../helpers/middleware");


router.get("/add", authenticateAdmin, extendSession, controller.form);
router.get("/edit/:userId", authenticateAdmin, extendSession, controller.form);

router.post(
  "/add",
  authenticateAdmin,
  extendSession,
  body("name").not().isEmpty().withMessage(Msg.NAME_IS_REQUIRED),
  body("phone").not().isEmpty().withMessage(Msg.PHONE_IS_REQUIRED),
  body("email")
    .not()
    .isEmpty()
    .withMessage(Msg.EMAIL_IS_REQUIRED)
    .isEmail()
    .withMessage(Msg.INVALID_EMAIL),
  body("password").not().isEmpty().withMessage(Msg.PASSWORD_IS_REQUIRED),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error(Msg.PASSWORD_NOT_MATCH);
    }
    return true;
  }),
  body("date_of_birth"),
  body("date_of_anniversary"),
  controller.add
);

router.get("", authenticateAdmin, controller.list);
router.get("/load-list", authenticateAdmin, controller.getList);

router.post(
  "/update/:userId",
  authenticateAdmin,
  extendSession,
  body("name").not().isEmpty().withMessage(Msg.NAME_IS_REQUIRED),
  body("phone").not().isEmpty().withMessage(Msg.PHONE_IS_REQUIRED),
  body("email")
    .not()
    .isEmpty()
    .withMessage(Msg.EMAIL_IS_REQUIRED)
    .isEmail()
    .withMessage(Msg.INVALID_EMAIL),
  body("password").optional(),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error(Msg.PASSWORD_NOT_MATCH);
    }
    return true;
  }),
  body("date_of_birth"),
  body("date_of_anniversary"),
  controller.update
);

router.post(
  "/delete",
  authenticateAdmin,
  extendSession,
  body("id")
    .not()
    .isEmpty()
    .withMessage(Msg.USER_ID_IS_REQUIRED)
    .isMongoId()
    .withMessage(Msg.INVALID_USER_ID),
  controller.delete
);

module.exports = router;
