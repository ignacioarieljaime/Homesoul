"use strict";
const { HttpStatus, ErrorCode } = require('../errors/code');
let { Msg } = require("../helpers/localization");
const Service = require("../helpers/index");
const send = Service.sendResponse;

module.exports = {
  errorLogger: async (error, req, res, _next) => {
    console.log('errorLogger', error);
    let status = HttpStatus.INTERNAL_SERVER_ERROR
    let code = ErrorCode.INTERNAL_SERVER_ERROR
    let msg = Msg.SOMETHING_WENT_WRONG

    status = error.status || status
    code = error.code || code
    msg = error.Msg || msg

    const record = {
      title: 'Server Error',
      routeName: req.path,
      data: {
        Msg: msg,
        time: Date.now(),
        user: req.authUser?.id,
        stack: error.stack,
        debug: error.data,
      },
    }

    return send(res, status, code, msg, record)
  },
};