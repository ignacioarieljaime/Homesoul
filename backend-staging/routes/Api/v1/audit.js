"use strict";
const express = require("express");
const router = express.Router();
const controller = require("../../../controller/Api/v1/auditController");
const { Msg } = require("../../../helpers/localization");
const { authenticate } = require("../../../helpers/middleware");
const { body } = require("express-validator");

/**
 * This router is use for get regions
 */
router.get("/get-regions", controller.getRegions);


/**
 * This router is use for get weather station
 */
router.get("/get-weather-station/:regionId", controller.getWeatherStation);


/**
 * This router is use for get nbc
 */
router.get("/get-nbc", controller.getNbc);

/**
 * This router is use for get ecPoints
 */
router.get("/get-ecPoints/:tierId", controller.getECpoints);

/**
 * This router is use for get zone
 */
router.get("/get-zone/:weatherStationId", controller.getClimateZone);

router.get("/get-credit", controller.getCreditAndEcp);

/**
 * This router is use for get assembly
 */
router.get("/get-assembly", controller.getAssembly);

/**
 *  This route is used for update password
 */
router.post(
    "/create-audit",
    authenticate,
    body("firstName").not().isEmpty().withMessage(Msg.NAME_IS_REQUIRED),
    body("lastName").optional(),
    body("phone").not().isEmpty().withMessage(Msg.PHONE_IS_REQUIRED),
    body("emailId")
        .not()
        .isEmpty()
        .withMessage(Msg.EMAIL_IS_REQUIRED)
        .isEmail()
        .withMessage(Msg.INVALID_EMAIL),
    body("addressLine1").not().isEmpty().withMessage(Msg.ADDRESS_IS_REQUIRED),
    body("projectName").not().isEmpty().withMessage(Msg.PROJECT_NAME_IS_REQUIRED),
    body("addressLine2").not().isEmpty().withMessage(Msg.ADDRESS_IS_REQUIRED),
    body("projectProvinceId").not().isEmpty().withMessage(Msg.PROVINCE_ID_IS_REQUIRED),
    body("weatherStationId").not().isEmpty().withMessage(Msg.WEATHER_STATION_ID_IS_REQUIRED),
    body("hdd").not().isEmpty().withMessage(Msg.HDD_IS_REQUIRED),
    body("nbcClimateZone").not().isEmpty().withMessage(Msg.NBCCLIMATEZONE_IS_REQUIRED),
    body("nbcPerspectiveTierId").not().isEmpty().withMessage(Msg.NBC_PERSPECTIVE_TIER_ID_IS_REQUIRED),
    body("houseTypeId").not().isEmpty().withMessage(Msg.HOUSETYPEID_IS_REQUIRED),
    body("fdwrPercent").not().isEmpty().withMessage(Msg.FDWRPERCENT_IS_REQUIRED),
    body("volume").not().isEmpty().withMessage(Msg.VOLUME_IS_REQUIRED),
    body("credit").not().isEmpty().withMessage(Msg.CREDIT_IS_REQUIRED),
    body("ecpRequired").not().isEmpty().withMessage(Msg.ECP_IS_REQUIRED),
    body("selectedAssembly").not().isEmpty().withMessage(Msg.ASSEMBLY_IS_REQUIRED),
    controller.createAudit
);

router.get("/get-request-count", authenticate, controller.getStatusCount);
router.get("/get-requests", authenticate, controller.getRequests);

router.post(
    "/accept-reject",
    authenticate,
    body("auditId").not().isEmpty().withMessage(Msg.AUDIT_ID_IS_REQUIRED),
    body("auditStatusId").not().isEmpty().withMessage(Msg.STATUS_IS_REQUIRED),
    body("reason").optional(),
    body("auditStatusId").custom((value, { req }) => {
        if (value === 5 && !req.body.reason) {
            throw new Error(Msg.REASON_IS_REQUIRED);
        }
        return true;
    }),
    controller.acceptReject
);
router.post(
    "/get-audit-result",
    body("auditId").not().isEmpty().withMessage(Msg.AUDIT_ID_IS_REQUIRED),
    controller.getAuditResult
);
router.post(
    "/create-audit-request",
    authenticate,
    controller.createAuditRequest
);
router.post(
    "/start-audit",
    authenticate,
    body("auditId").not().isEmpty().withMessage(Msg.AUDIT_ID_IS_REQUIRED),
    controller.startAudit
);

/**
 * This router is use for get ecPoints
 */
router.get(
    "/get-audit-details/:auditId",
    authenticate,
    controller.getAuditDetails
);

router.get("/get-customer-audit-requests", authenticate, controller.customerAuditRequestList);

router.get("/get-home-details", authenticate, controller.homeDetails);

router.get("/get-property-details", authenticate, controller.propertyDetails);



module.exports = router;