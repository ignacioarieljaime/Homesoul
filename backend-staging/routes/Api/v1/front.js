"use strict";
const express = require("express");
const router = express.Router();
const controller = require("../../../controller/Api/v1/frontController");
const { Msg } = require("../../../helpers/localization");
const { authenticate } = require("../../../helpers/middleware");
const { body } = require("express-validator");
router.post(
    "/create-lead",
    body("name").not().isEmpty().withMessage(Msg.NAME_IS_REQUIRED),
    body("email").not().isEmpty().withMessage(Msg.EMAIL_IS_REQUIRED),
    body("phone").not().isEmpty().withMessage(Msg.PHONE_IS_REQUIRED),
    body("city").not().isEmpty().withMessage(Msg.CITY_IS_REQUIRED),
    body("province").not().isEmpty().withMessage(Msg.PROVINCE_IS_REQUIRED),
    body("country").not().isEmpty().withMessage(Msg.COUNTRY_IS_REQUIRED),
    controller.createLead
);
module.exports = router;