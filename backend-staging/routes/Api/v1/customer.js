"use strict";
const express = require("express");
const router = express.Router();
const controller = require("../../../controller/Api/v1/customerController");
const { Msg } = require("../../../helpers/localization");
const { authenticate } = require("../../../helpers/middleware");
const { body } = require("express-validator");

router.post(
    "/create-property",
    body("type").not().isEmpty().withMessage(Msg.NAME_IS_REQUIRED),
    body("title").not().isEmpty().withMessage(Msg.TITLE_IS_REQUIRE),
    body("address").not().isEmpty().withMessage(Msg.ADDRESS_IS_REQUIRED),
    body("city").not().isEmpty().withMessage(Msg.CITY_IS_REQUIRED),
    body("provinceId").not().isEmpty().withMessage(Msg.PROVINCE_IS_REQUIRED),
    body("postalCode").not().isEmpty().withMessage(Msg.POSTCODE_IS_REQUIRED),
    authenticate,
    controller.addProperty
);
router.get("/get-properties", authenticate, controller.getProperties);

module.exports = router;