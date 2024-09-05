const Service = require("../../helpers/index");
const ENUM = require("../../helpers/enum");
const AuditorModel = require("../../model/auditor");
const AuditorDocumentsModel = require("../../model/auditor_documents");
const UserModel = require("../../model/user");
const { HttpStatus, ErrorCode } = require("../../errors/code");
const { Msg } = require("../../helpers/localization");
const { Op, where } = require("sequelize");
const { DOCUMENT_TYPE } = require("../../helpers/enum");

module.exports = {
  list: async function (req, res, next) {
    try {
      if (Service.hasValidatorErrorsBackend(req, res)) {
        return;
      }
      res.render("auditor/index", {
        title: "Auditors",
        route: "auditor",
        tableId: "auditor-table",
        loadList: "/auditor/load-list",
      });
    } catch (error) {
      next(error);
    }
  },

  getList: async function (req, res, next) {
    try {
      const { draw, start, length, search, order } = req.query;
      const searchTerm = search.value || "";

      let options = {
        attributes: ["id", "firstName", "lastName", "emailID"],
        limit: parseInt(length),
        offset: parseInt(start),
        where: {
          isDeleted: false,
          userType: ENUM.Type.Engineer
        },
        order: []
      };
      options = Service.applySearch(options, searchTerm, ['firstName', 'lastName', 'emailID']);
      options = Service.applyOrder(options, order, ['firstName', 'lastName', 'emailID']);

      const result = await UserModel.findAndCountAll(options);
      const users = result.rows;
      const formattedData = await Promise.all(users.map(async (element) => {
        const auditor = await AuditorModel.findOne({ where: { userId: element.id } })
        const auditorDocuments = await AuditorDocumentsModel.findOne({ where: { auditorId: auditor.id } })
        const formattedElement = {
          firstName: element.firstName,
          lastName: element.lastName,
          emailID: element.emailID,
          documentTypeId: auditorDocuments && auditorDocuments.documentTypeId
            ? DOCUMENT_TYPE[auditorDocuments.documentTypeId]
            : "-",
          documentFile: auditorDocuments && auditorDocuments.documentFile
            ? `<a href="${process.env.BASE_URL}${auditorDocuments.documentFile}" target="_blank"><i class="fas fa-eye"></i> View Document</a>`
            : "-",
          addressLine1: auditor.addressLine1,
          addressLine2: auditor.addressLine2,
          action:
            auditorDocuments && auditorDocuments.documentTypeId &&
              auditorDocuments.documentFile
              ? `<button type="button" onclick="approveOrReject('approve', '/auditor/approve-reject','${auditorDocuments.id}')" class="btn btn-success btn-sm"><i class="fas fa-check-circle" aria-hidden="true"></i></button><button type="button" onclick="approveOrReject('reject', '/auditor/approve-reject','${auditorDocuments.id}')" class="btn btn-danger btn-sm"><i class="fa fa-ban" aria-hidden="true"></i></button>`
              : "-",
        };

        return formattedElement;
      }));
      const totalRecords = await UserModel.count({
        where: {
          isDeleted: false,
          userType: ENUM.Type.Engineer,
        }
      });
      res.json({
        draw: parseInt(draw),
        recordsTotal: totalRecords,
        recordsFiltered: result.count,
        data: formattedData,
      });
    } catch (error) {
      next(error);
    }
  },
  approveReject: async function (req, res, next) {
    try {
      if (Service.hasValidatorErrorsBackend(req, res)) {
        return;
      }
      const detail = await AuditorDocumentsModel.findByPk(req.body.id);
      if (!detail) {
        return res
          .status(HttpStatus.BAD_REQUEST_STATUS_CODE)
          .send({ message: Msg.AUDITOR_DOCUMENT_NOT_FOUND });
      }
      if (req.body.action === "approve") {
        detail.isVerified = true;
        await detail.save();
        return res.status(HttpStatus.SUCCESS_CODE).send({
          message: Msg.AUDITOR_DOCUMENT_VERIFY_SUCCESSFULLY,
          url: "/auditor",
        });
      } else if (req.body.action === "reject") {
        detail.isVerified = false;
        await detail.save();
      }
      return res.status(HttpStatus.SUCCESS_CODE).send({
        message: Msg.AUDITOR_DOCUMENT_UNVERIFIED_SUCCESSFULLY,
        url: "/auditor",
      });
    } catch (error) {
      next(error);
    }
  },
};
