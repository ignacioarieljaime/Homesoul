const { HttpStatus, ErrorCode } = require("../errors");
const { Msg } = require("../helpers/localization");
const Service = require("../helpers/index");
// const userRepo = require("../data-access/user");
const { Type, ACTION } = require("../helpers/enum");
const { adminRoutes, userRoutes } = require("../helpers/constant");
const userService = require("../service/user");
const send = Service.sendResponse;
const userRepo = require("../data-access/user");
const UserModel = require("../model/user");
const AdminModel = require("../model/admin");

// middleware
function parseAccessToken(req) {
  const auth = req.headers.authorization;
  const [type, token] = auth ? auth.split(" ") : [undefined, undefined];
  if (type === "Bearer") {
    return token;
  } else {
    const header = req.headers.authorization;
    return typeof header === "string" ? header : undefined;
  }
}
async function authenticateAdmin(req, res, next) {
  try {
    const accessToken = req.cookies.token || req.headers.authorization || req.query.token;

    if (accessToken === undefined) {
      res.cookie("msg", { "error": Msg.LOGIN_REQUIRED }, { httpOnly: true });
      return res.redirect('/');
    }

    const token = Service.verifyJwt(accessToken);
    if (!token.isValid || token.action != ACTION.Access) {
      res.cookie("msg", { "error": Msg.UNAUTHORIZED }, { httpOnly: true });
      return res.redirect('/');
    }
    const isAdminLoggedIn = await AdminModel.findOne({
      where: { id: token.sub, login_access_token: accessToken },
    });
    if (!isAdminLoggedIn) {
      res.cookie("msg", { "error": Msg.TOKEN_INVALID }, { httpOnly: true });
      return res.redirect('/');
    }
    const admin = await AdminModel.findByPk(token.sub);
    if (!admin) {
      res.cookie("msg", { "error": Msg.TOKEN_INVALID }, { httpOnly: true });
      return res.redirect('/');
    }
    req.authUser = admin;
    return next();
  } catch (err) {
    next(err);
  }
}

function extendSession(req, res, next) {
  req.session._garbage = Date();
  req.session.touch();
  next();
}

async function authenticate(req, res, next) {
  try {
    const accessToken = parseAccessToken(req);
    if (accessToken === undefined) {
      return send(res, HttpStatus.BAD_REQUEST_STATUS_CODE, ErrorCode.REQUIRED_CODE, Msg.TOKEN_REQUIRED, null);
    }
    const token = Service.verifyJwt(accessToken);
    if (!token.isValid) {
      return send(res, HttpStatus.UNAUTHORIZED, ErrorCode.INVALID_CODE, Msg.TOKEN_INVALID, null);
    }
    if (token.action != ACTION.Access) {
      return send(res, HttpStatus.UNAUTHORIZED, HttpStatus.UNAUTHORIZED, Msg.UNAUTHORIZED, null);
    }
    const isUserLoggedIn = await UserModel.findOne({
      where: { id: token.sub, login_access_token: accessToken },
    });
    if (!isUserLoggedIn) {
      return send(res, HttpStatus.UNAUTHORIZED, ErrorCode.INVALID_CODE, Msg.TOKEN_INVALID, null);
    }
    const user = await UserModel.findByPk(token.sub);
    if (!user) {
      return send(res, HttpStatus.UNAUTHORIZED, ErrorCode.INVALID_CODE, Msg.TOKEN_INVALID, null);
    }
    req.authUser = user;

    return next();
  } catch (err) {
    next(err);
  }
}


// async function authentication(req, res, next) {
//   try {
//     const authorization = req.header("Authorization");
//     const tokenData = authorization.split(" ");
//     let token = "";
//     if (tokenData[1]) {
//       token = tokenData[1];
//     } else {
//       token = authorization;
//     }

//     if (!token)
//     return send(
//         res,
//         HttpStatus.BAD_REQUEST_STATUS_CODE,
//         ErrorCode.REQUIRED_CODE,
//         Msg.TOKEN_REQUIRED,
//         null
//       );

//     const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await userRepo.getDetail({ _id: decodedToken._id });
//     if (!user) {
//       return send(
//         res,
//         HttpStatus.BAD_REQUEST_STATUS_CODE,
//         ErrorCode.REQUIRED_CODE,
//         Msg.TOKEN_REQUIRED,
//         null
//       );
//     }
//     req.authUser = user;
//     next();
//   } catch (error) {
//     console.log("error", error);
//     return send(
//       res,
//       HttpStatus.UNAUTHORIZED,
//       ErrorCode.INVALID_CODE,
//       Msg.TOKEN_INVALID,
//       null
//     );
//   }
// }

module.exports = {
  authenticate: authenticate,
  authenticateAdmin: authenticateAdmin,
  extendSession: extendSession,
  //   authentication: authentication,
};
