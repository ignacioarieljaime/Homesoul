"use strict";

/**
 * @enum {number}
 */
const HttpStatus = {
    SUCCESS_CODE: 200,
    INTERNAL_SERVER_ERROR: 500,
    BAD_REQUEST_STATUS_CODE: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
};

/**
 * @enum {number}
 */
const ErrorCode = {
    INTERNAL_SERVER_ERROR: 500,
    INVALID_LOGIN_CREDENTIAL: 2000,
    REQUIRED_CODE: 2022,
    INVALID_CODE: 2023,
    EXIST_CODE: 2024,
    NO_RECORD_FOUND_CODE: 2033,
    INVALID_OTP: 2042,
    EMAIL_EXIST: 2043,
    PROMOTION_NAME_EXIST: 2044
}

module.exports = { HttpStatus, ErrorCode }