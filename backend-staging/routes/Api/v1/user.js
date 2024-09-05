"use strict";
const controller = require("../../../controller/Api/v1/userController");
const express = require("express");
const router = express.Router();
const { Msg } = require("../../../helpers/localization");
const { body } = require("express-validator");
const { authenticate } = require("../../../helpers/middleware");

/**
 *  This route is used for signup
 */
router.post("/signup",
    body("firstName").not().isEmpty().withMessage(Msg.FIRST_NAME_IS_REQUIRED),
    body("lastName").not().isEmpty().withMessage(Msg.LAST_NAME_IS_REQUIRED),
    body("phoneNo").not().isEmpty().withMessage(Msg.PHONE_IS_REQUIRED),
    body("emailID")
        .not()
        .isEmpty()
        .withMessage(Msg.EMAIL_IS_REQUIRED)
        .isEmail()
        .withMessage(Msg.INVALID_EMAIL),
    body("addressLine1").not().isEmpty().withMessage(Msg.ADDRESS_IS_REQUIRED),
    body("addressLine2").not().isEmpty().withMessage(Msg.ADDRESS_IS_REQUIRED),
    body("phoneNo").not().isEmpty().withMessage(Msg.PHONE_IS_REQUIRED).isLength({ min: 10, max: 10 }).withMessage(Msg.PHONE_LENGTH_IS_REQUIRED),
    body("password").not().isEmpty().withMessage(Msg.PASSWORD_IS_REQUIRED),
    body("userType").optional(),
    controller.signup
);

/**
 * This router is used for verify account
 */
router.post("/verify-account",
    body("token").not().isEmpty().withMessage(Msg.TOKEN_REQUIRED),
    controller.verifyAccount)
/**
 *  This route is used for signup
 */
router.post(
    "/login",
    body("email")
        .not()
        .isEmpty()
        .withMessage(Msg.EMAIL_IS_REQUIRED)
        .isEmail()
        .withMessage(Msg.INVALID_EMAIL),
    body("password").not().isEmpty().withMessage(Msg.PASSWORD_IS_REQUIRED),
    controller.login
);

/**
 *  This route is used for signup
 */
router.post(
    "/forgot-password",
    body("email")
        .not()
        .isEmpty()
        .withMessage(Msg.EMAIL_IS_REQUIRED)
        .isEmail()
        .withMessage(Msg.INVALID_EMAIL),
    controller.forgotPassword
);

/**
 *  This route is used for reset password
 */
router.post(
    "/reset-password",
    body("token").not().isEmpty().withMessage(Msg.TOKEN_REQUIRED),
    body("password").not().isEmpty().withMessage(Msg.PASSWORD_IS_REQUIRED),
    body("confirmPassword").not().isEmpty().withMessage(Msg.NEW_PASSWORD_IS_REQUIRED),
    controller.updatePassword
);

/**
 *  This route is used for signup
 */
router.get("/profile", authenticate, controller.getMyProfile);

/**
 *  This route is used for update password
 */
router.post(
    "/profile/update",
    authenticate,
    body("firstName").not().isEmpty().withMessage(Msg.NAME_IS_REQUIRED),
    body("lastName").optional(),
    body("phoneNo").not().isEmpty().withMessage(Msg.PHONE_IS_REQUIRED),
    body("emailID")
        .not()
        .isEmpty()
        .withMessage(Msg.EMAIL_IS_REQUIRED)
        .isEmail()
        .withMessage(Msg.INVALID_EMAIL),
    body("password").optional(),
    body("addressLine1").not().isEmpty().withMessage(Msg.ADDRESS_IS_REQUIRED),
    body("addressLine2").not().isEmpty().withMessage(Msg.ADDRESS_IS_REQUIRED),
    // body("postcode").not().isEmpty().withMessage(Msg.POSTCODE_IS_REQUIRED),
    controller.updateUser
);


router.get(
    "/logout",
    authenticate,
    controller.logout
);


/**
 *  This route is used for delete user By Id
 */
router.delete("/delete", authenticate, controller.deleteUser);


/**
 *  This route is used for save pincode of auditor
 */
router.post(
    "/save-auditor-pincode",
    authenticate,
    body("provinceId").not().isEmpty().withMessage(Msg.PROVINCE_ID_IS_REQUIRED),
    controller.saveAuditorPincode
);

router.get(
    "/get-auditor-pincode",
    authenticate,
    controller.getAuditorPincode
);

router.delete(
    "/delete-pincode",
    authenticate,
    body("id").not().isEmpty().withMessage(Msg.ID_IS_REQUIRED),
    controller.deleteAuditorPincode
);



module.exports = router;
