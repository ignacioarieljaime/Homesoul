const { sendResponse } = require('../helpers/index');
const { HttpStatus, ErrorCode } = require('./code')


function BadRequestError(res, code, msg, data) {
    return sendResponse(res, HttpStatus.BAD_REQUEST_STATUS_CODE, code, msg, data)
}

function NotFoundError(res, code, msg, data) {
    return sendResponse(res, HttpStatus.NOT_FOUND, code, msg, data)
}

module.exports = {
    HttpStatus,
    ErrorCode,
    NotFoundError,
    BadRequestError,
}
