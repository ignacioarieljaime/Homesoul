const Service = require("../../../helpers/index");
const { Status } = require("../../../helpers/enum");
const moment = require("moment");
const send = Service.sendResponse;
const { Msg } = require("../../../helpers/localization");
const bcrypt = require("bcrypt");
const { HttpStatus, ErrorCode } = require("../../../errors/code");
const emailRepo = require("../../../helpers/email");

const { Type, TYPE_NAME } = require("../../../helpers/enum");
const UserHomeModel = require('../../../model/user_home');
const UserModel = require("../../../model/user");
const AuditorModel = require("../../../model/auditor");
const AuditorDocumentModel = require("../../../model/auditor_documents");
const AuditorPincodeModel = require("../../../model/auditor_pincode");
const RegionModel = require("../../../model/regions");
const path = require("path");
const { Op } = require("sequelize");
const fs = require("fs");
const ejs = require("ejs");

module.exports = {
  /**
   * This function is use for signup
   */
  signup: async function (req, res, next) {
    try {
      if (Service.hasValidatorErrors(req, res)) {
        return;
      }
      const { firstName, lastName, emailID, password, confirmPassword, phoneNo, pincode, provinceId, addressLine1, addressLine2, userType, energyAudit, consultation, investment } = req.body;
      const emailExist = await UserModel.findOne({ where: { emailID } });
      if (emailExist) {
        return await Service.getBadrequestErrorResponse(Msg.EMAIL_ALREADY_EXIST, res);
      }
      if (password !== confirmPassword) {
        return await Service.getBadrequestErrorResponse(Msg.PASSWORD_DOES_NOT_MATCH, res);
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await UserModel.create({
        firstName,
        lastName,
        emailID,
        password: hashedPassword,
        phoneNo,
        pincode,
        addressLine1,
        addressLine2,
        userType,
        provinceId,
        energy_audit: energyAudit,
        consultation,
        seeking_investment: investment
      });

      const token = await Service.generateAccessToken(user.id, process.env.JWT_SECRET, false);

      if (user.userType === Type.Engineer) {
        await AuditorModel.create({ userId: user.id, addressLine1, addressLine2 });
      } else {
        await UserHomeModel.create({ userId: user.id, pincode, addressLine1, addressLine2 });
      }
      const verificationToken = await Service.generaterandomToken();

      user.login_access_token = token;
      user.emailVerificationCode = verificationToken;
      await user.save();

      const verifyEmailTemplate = await ejs.renderFile("views/email-verification.ejs", {
        baseUrl: process.env.BASE_URL,
        token: verificationToken,
        email: emailID,
        name: firstName,
      });

      const mailOption = {
        to: emailID,
        subject: "Verify email",
        html: verifyEmailTemplate,
      };

      const isEmailSent = await emailRepo.sendMail(mailOption);

      const responseData = {
        token,
        firstName,
        lastName,
        emailID,
        phoneNo,
        pincode,
        provinceId,
        addressLine1,
        addressLine2,
        userType
      };

      return await Service.getSuccessResponse(Msg.SIGNUP_SUCCESSFULLY, res, responseData);
    } catch (error) {
      console.log('error.message', error);
      return await Service.getInternalServerErrorResponse(error.message, res);
    }
  },

  /**
   * This function is use for verify account
   */
  verifyAccount: async function (req, res, next) {
    try {
      if (Service.hasValidatorErrors(req, res)) {
        return;
      }
      const token = req.body.token;
      const tokenExist = await UserModel.findOne({
        where: { emailVerificationCode: token },
      });
      if (!tokenExist) {
        return await Service.getBadrequestErrorResponse(Msg.TOKEN_INVALID, res);
      }
      if (tokenExist.isEmailVerified === 1) {
        return await Service.getSuccessResponse(Msg.EMAIL_ALREADY_VERIFIED, res, { type: 1 });
      } else {
        tokenExist.isEmailVerified = 1;
        await tokenExist.save();
        return await Service.getSuccessResponse(Msg.EMAIL_SUCCESSFULLY_VERIFIED, res, { type: 2 });
      }
    } catch (error) {
      console.log('error.message', error);
      return await Service.getInternalServerErrorResponse(error.message, res);
    }
  },

  /**
   * This function is use for login
   */
  login: async function (req, res, next) {
    try {
      if (Service.hasValidatorErrors(req, res)) {
        return;
      }

      const { email, password } = req.body;

      const user = await UserModel.findOne({ where: { emailId: email, isDeleted: false } });

      if (!user) {
        return await Service.getBadrequestErrorResponse(Msg.INVALID_LOGIN_CREDENTIAL, res);

      }

      if (user.status === Status.Inactive) {
        return await Service.getBadrequestErrorResponse(Msg.YOUR_ACCOUNT_SUSPENDED, res);

      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return await Service.getBadrequestErrorResponse(Msg.INVALID_PASSWORD, res);
      }

      const token = await Service.generateAccessToken(user.id, user.userType, false);

      user.login_access_token = token;
      await user.save();

      const responseData = {
        login_access_token: user.login_access_token,
        userType: user.userType,
        firstName: user.firstName,
        lastName: user.lastName,
        emailID: user.emailID,
        phoneNo: user.phoneNo,
        pincode: user.pincode || '',
        addressLine1: user.addressLine1,
        addressLine2: user.addressLine2,
        address: user.address,
        postcode: user.postcode,
        country: user.country,
      };

      return await Service.getSuccessResponse(Msg.LOGIN_SUCCESSFULLY, res, responseData);
    } catch (error) {
      console.log('error.message', error);
      return await Service.getInternalServerErrorResponse(error.message, res);
    }
  },

  /**
   * This function is use for get my profile
   */
  getMyProfile: async function (req, res, next) {
    try {
      const { id, userType, firstName, lastName, emailID, provinceId, isEmailVerified, isPhoneVerified, phoneNo, pincode, addressLine1, addressLine2, address, postcode, country } = req.authUser;

      const userTypeName = TYPE_NAME[userType] || ''
      const userInfo = {
        userType,
        userTypeName,
        firstName,
        lastName,
        emailID,
        isEmailVerified,
        isPhoneVerified,
        phoneNo,
        pincode: pincode || '',
        provinceId: provinceId || '',
        addressLine1,
        addressLine2,
        address,
        postcode,
        country,
        documentTypeId: null,
        documentUrl: null
      };
      const checkDocument = await AuditorDocumentModel.findOne({
        where: { auditorId: id },
      });

      const data = checkDocument ? {
        ...userInfo,
        documentTypeId: checkDocument.documentTypeId,
        documentUrl: process.env.BASE_URL + checkDocument.documentFile
      } : userInfo;

      return await Service.getSuccessResponse(Msg.SUCCESS_MESSAGE, res, { data });
    } catch (error) {
      console.error('Error:', error.message);
      return await Service.getInternalServerErrorResponse(error.message, res);
    }
  },
  /**
   * This function is used for forgot password to send mail
   */
  forgotPassword: async function (req, res, next) {
    try {
      if (Service.hasValidatorErrors(req, res)) {
        return;
      }

      const existEmail = await UserModel.findOne({
        where: { emailID: req.body.email },
      });
      if (!existEmail) {
        return await Service.getBadrequestErrorResponse(Msg.EMAIL_NOT_EXIST, res);
      }
      if (existEmail.status == Status.Inactive) {
        return await Service.getBadrequestErrorResponse(Msg.YOUR_ACCOUNT_SUSPENDED, res);
      }

      const resetToken = await Service.generaterandomToken();
      const currentUnixTimestamp = Service.getCurrentTimeStampUnix();
      const newUnixTimestamp = moment
        .unix(currentUnixTimestamp)
        .add(15, "minutes")
        .unix();
      existEmail.forgotPasswordCode = resetToken;
      existEmail.forgotPasswordCodeExpires = newUnixTimestamp;

      await existEmail.save();

      const resetLinkUrl = await Service.getFrontendUrl(
        "reset-password",
        resetToken
      );

      const mailOption = {
        to: req.body.email,
        subject: "Reset your password now",
        html: `<p>Click here to reset your password</p> 
                <a href="${resetLinkUrl}">Click here to reset</a>`,
      };
      const isEmailSent = await emailRepo.sendMail(mailOption);
      return await Service.getSuccessResponse(Msg.RESET_PASSWORD_EMAIL_SENT_SUCCESSFULLY, res);

    } catch (error) {
      console.log('error.message', error);
      return await Service.getInternalServerErrorResponse(error.message, res);
    }
  },

  /**
   * This function is use for update user
   */
  updatePassword: async function (req, res, next) {
    try {
      const { token, password, confirmPassword } = req.body;

      if (password !== confirmPassword) {
        return await Service.getBadrequestErrorResponse(Msg.PASSWORD_DOES_NOT_MATCH, res);
      }
      const user = await UserModel.findOne({
        where: { forgotPasswordCode: token },
      });
      if (!user) {
        return await Service.getBadrequestErrorResponse(Msg.TOKEN_INVALID, res);
      }
      if (user.is_offline === 0 && user.forgotPasswordCodeExpires < Service.getCurrentTimeStampUnix()) {
        return await Service.getBadrequestErrorResponse(Msg.LINK_EXPIRED, res);
      }
      const hashedPassword = await Service.bcryptPassword(password);
      await UserModel.update(
        {
          password: hashedPassword,
          forgotPasswordCode: null,
          forgotPasswordCodeExpires: null,
        },
        { where: { forgotPasswordCode: token } }
      );
      return await Service.getSuccessResponse(Msg.PASSWORD_UPDATE_SUCCESSFULLY, res);

    } catch (error) {
      console.log('error.message', error);
      return await Service.getInternalServerErrorResponse(error.message, res);
    }
  },

  /**
   * This function is use for update user
   */
  updateUser: async function (req, res, next) {
    try {
      if (Service.hasValidatorErrors(req, res)) {
        return;
      }

      const user = req.authUser;

      const checkEmail = await UserModel.findOne({
        where: {
          emailID: req.body.emailID,
          id: { [Op.ne]: user.id },
        },
      });
      if (checkEmail) {
        return await Service.getBadrequestErrorResponse(Msg.EMAIL_ALREADY_EXIST, res);
      }
      const updateDetail = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailID: req.body.emailID,
        phoneNo: req.body.phoneNo,
        pincode: req.body.pincode,
        provinceId: req.body.provinceId,
        addressLine1: req.body.addressLine1,
        addressLine2: req.body.addressLine2,
      };

      if (req.body.emailID !== user.emailID) {
        const resetToken = await Service.generaterandomToken();

        updateDetail.emailVerificationCode = resetToken;
        updateDetail.isEmailVerified = 0;

        const tokenUrl = await Service.getFrontendUrl(
          "email-token",
          resetToken
        );

        const mailOption = {
          to: req.body.emailID,
          subject: "Password reset",
          html: `<p>Click here to verify your account</p> 
                            <a href= "${tokenUrl}">Click here to Verify your account</a>`,
        };

        const isEmailSent = await emailRepo.sendMail(mailOption);
      }

      const userData = await UserModel.update(updateDetail, {
        where: { id: user.id },
      });
      if (user.userType === Type.Engineer) {
        const updatedAuditor = await AuditorModel.update(
          {
            addressLine1: req.body.addressLine1,
            addressLine2: req.body.addressLine2,
          },
          { where: { userId: user.id } }
        );
        const auditor = await AuditorModel.findOne({
          where: { userId: user.id },
        });
        const checkDocument = await AuditorDocumentModel.findOne({
          where: { auditorId: auditor.id },
        });
        let documentUrl = "";
        if (checkDocument) {
          documentUrl = checkDocument.documentFile;
          if (req.files && req.files.documentFile) {
            const folderName = "auditor-documents";
            documentUrl = await Service.imageUpload(
              req.files.documentFile,
              folderName,
              path.join(process.cwd(), documentUrl)
            );
            checkDocument.documentTypeId = req.body.documentTypeId;
            checkDocument.documentFile = documentUrl;
            await checkDocument.save();
          }
        } else {
          if (req.files && req.files.documentFile) {
            const folderName = "auditor-documents";
            documentUrl = await Service.imageUpload(
              req.files.documentFile,
              folderName
            );
            const documentInfo = {
              auditorId: auditor.id,
              documentTypeId: req.body.documentTypeId,
              documentFile: documentUrl,
            };
            const documentData = await AuditorDocumentModel.create(
              documentInfo
            );
          }
        }
      }
      if (!userData) {
        return await Service.getBadrequestErrorResponse(Msg.SOMETHING_WENT_WRONG, res);
      }
      return await Service.getSuccessResponse(Msg.USER_UPDATE_SUCCESSFULLY, res, { id: user.id });

    } catch (error) {
      console.log('error.message', error);
      return await Service.getInternalServerErrorResponse(error.message, res);
    }
  },

  /**
   * This function is use for delete user
   */
  deleteUser: async function (req, res, next) {
    try {
      if (Service.hasValidatorErrors(req, res)) {
        return;
      }
      const user = await UserModel.findByPk(req.authUser.id);
      if (!user) {
        return await Service.getBadrequestErrorResponse(Msg.USER_NOT_FOUND, res);

      }
      user.isDeleted = true;
      user.save();
      return await Service.getSuccessResponse(Msg.ACCOUNT_DELETE_SUCCESSFULLY, res);

    } catch (error) {
      console.log('error.message', error);
      return await Service.getInternalServerErrorResponse(error.message, res);
    }
  },

  logout: async function (req, res, next) {
    try {
      const user = req.authUser;
      const userData = await UserModel.update(
        { login_access_token: null },
        {
          where: { id: user.id },
        }
      );
      return await Service.getSuccessResponse(Msg.LOGOUT_SUCCESSFUL, res);

    } catch (error) {
      console.log('error.message', error);
      return await Service.getInternalServerErrorResponse(error.message, res);
    }
  },

  /**
   * This function is used for save auditor pincode
   */
  saveAuditorPincode: async function (req, res, next) {
    try {
      if (Service.hasValidatorErrors(req, res)) {
        return;
      }
      const user = req.authUser;
      const { provinceId } = req.body;

      const userExist = await UserModel.findOne({
        where: { id: user.id },
      });
      if (!userExist) {
        return await Service.getBadrequestErrorResponse(Msg.USER_NOT_FOUND, res);
      }

      const auditorExist = await AuditorModel.findOne({
        where: { userId: user.id },
      });

      if (!auditorExist) {
        return await Service.getBadrequestErrorResponse(Msg.USER_IS_NOT_AUDITOR, res);
      }

      const pincodeExist = await AuditorPincodeModel.findOne({
        where: { auditorId: auditorExist.id, isDeleted: false },
      });
      if (pincodeExist) {
        return await Service.getBadrequestErrorResponse(Msg.PROVINCE_IS_EXIST, res);
      }

      const AuditorPincodeInfo = {
        auditorId: auditorExist.id,
        provinceId: provinceId,
      };

      const AuditorPincode = await AuditorPincodeModel.create(AuditorPincodeInfo);
      if (!AuditorPincode) {
        return await Service.getBadrequestErrorResponse(Msg.SOMETHING_WENT_WRONG, res);
      }

      return await Service.getSuccessResponse(Msg.PROVINCE_ADDED_SUCCESS, res);

    } catch (error) {
      console.log('error.message', error);
      return await Service.getInternalServerErrorResponse(error.message, res);
    }
  },
  getAuditorPincode: async function (req, res, next) {
    try {
      if (Service.hasValidatorErrors(req, res)) {
        return;
      }
      const user = req.authUser;

      const userExist = await UserModel.findOne({
        where: { id: user.id },
      });
      if (!userExist) {
        return await Service.getBadrequestErrorResponse(Msg.USER_NOT_FOUND, res);
      }

      const auditorExist = await AuditorModel.findOne({
        where: { userId: user.id },
      });

      if (!auditorExist) {
        return await Service.getBadrequestErrorResponse(Msg.USER_IS_NOT_AUDITOR, res);
      }

      const pincodeData = await AuditorPincodeModel.findAll({
        include: [
          {
            model: RegionModel,
            as: "regions",
            attributes: ["regionCode", "regionTitle"],
          }
        ],
        where: { auditorId: auditorExist.id, isDeleted: false },
      });

      const pincode_data = []

      for (const item of pincodeData) {
        pincode_data.push({
          id: item.id,
          provinceId: item.provinceId,
          province: item.regions.regionCode,
          regionTitle: item.regions.regionTitle
        });
      }


      return await Service.getSuccessResponse(Msg.SUCCESS_MESSAGE, res, pincode_data);

    } catch (error) {
      console.log('error.message', error);
      return await Service.getInternalServerErrorResponse(error.message, res);
    }
  },
  deleteAuditorPincode: async function (req, res, next) {
    try {
      if (Service.hasValidatorErrors(req, res)) {
        return;
      }
      const user = req.authUser;

      const userExist = await UserModel.findOne({
        where: { id: user.id },
      });
      if (!userExist) {
        return await Service.getBadrequestErrorResponse(Msg.USER_NOT_FOUND, res);
      }

      const auditorExist = await AuditorModel.findOne({
        where: { userId: user.id },
      });

      if (!auditorExist) {
        return await Service.getBadrequestErrorResponse(Msg.USER_IS_NOT_AUDITOR, res);
      }
      const detail = await AuditorPincodeModel.findByPk(req.body.id);
      if (!detail) { return res.status(HttpStatus.BAD_REQUEST_STATUS_CODE).send({ message: Msg.RECORD_NOT_FOUND }); }

      detail.isDeleted = true;
      detail.save();

      return await Service.getSuccessResponse(Msg.SUCCESS_MESSAGE, res);

    } catch (error) {
      console.log('error.message', error);
      return await Service.getInternalServerErrorResponse(error.message, res);
    }
  },
};
