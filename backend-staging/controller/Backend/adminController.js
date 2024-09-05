const Service = require("../../helpers/index");
const sendView = Service.sendView;
const bcrypt = require("bcrypt");
const { HttpStatus, ErrorCode } = require("../../errors/code");
const { Msg } = require("../../helpers/localization");
const AdminModel = require("../../model/admin");
const common = require("../../data-access/common");
const adminRepo = require("../../data-access/admin");
const { Op } = require("sequelize");

module.exports = {
  form: async function (req, res, next) {
    try {
      const itemId = req.params.adminId;
      var data = null;
      if (itemId !== undefined) {
        data = await common.findOne(AdminModel, { id: itemId });
      }
      if (data === null) {
        res.render("admin/form", {
          title: "Add Form",
          route: "admin",
          data: null,
          url: "/admin/add",
        });
      } else {
        const newData = {
          firstName: data.firstName,
          lastName: data.lastName,
          emailID: data.emailID,
          // password: data.password,
          phoneNo: data.phoneNo,
        };
        res.render("admin/form", {
          title: "Edit Form",
          route: "admin",
          data: newData,
          url: "/admin/update/" + itemId,
        });
      }
    } catch (error) {
      next(error);
    }
  },
  add: async function (req, res, next) {
    try {
      if (Service.hasValidatorErrorsBackend(req, res)) {
        return;
      }
      const {
        firstName,
        lastName,
        emailID,
        password,
        confirmPassword,
        phoneNo,
      } = req.body;

      const emailExist = await common.findOne(AdminModel, {
        emailID: req.body.emailID,
      });
      if (emailExist) {
        return res
          .status(HttpStatus.BAD_REQUEST_STATUS_CODE)
          .send({ message: Msg.EMAIL_ALREADY_EXIST });
      }
      if (password !== confirmPassword) {
        return res
          .status(HttpStatus.BAD_REQUEST_STATUS_CODE)
          .send({ message: Msg.PASSWORD_DOES_NOT_MATCH });
      }

      const data = {
        firstName: firstName,
        lastName: lastName,
        emailID: emailID,
        password: await bcrypt.hash(password, 10),
        confirmPassword: await bcrypt.hash(confirmPassword, 10),
        phoneNo: phoneNo,
      };
      const token = await Service.generateAccessToken(
        data.id,
        process.env.JWT_SECRET,
        false
      );

      data.login_access_token = token;
      // await data.save();

      await common.create(AdminModel, data);

      return res
        .status(HttpStatus.SUCCESS_CODE)
        .send({ message: Msg.ADMIN_ADD_SUCCESSFULLY, url: "/admin" });
    } catch (error) {
      console.error("Error creating admin:", error);
      next(error);
    }
  },
  list: async function (req, res, next) {
    try {
      if (Service.hasValidatorErrorsBackend(req, res)) {
        return;
      }
      res.render("admin/index", {
        title: "Admins",
        route: "admin",
        tableId: "admin-table",
        loadList: "/admin/load-list",
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
        attributes: [
          "firstName",
          // "lastName",
          "id",
          "emailID",
          // "phoneNo",
          // "password",
        ],
        limit: parseInt(length),
        offset: parseInt(start),
        where: {
          isDeleted: false,
        },
        order: [],
        raw: true,
      };

      options = Service.applySearch(options, searchTerm, [
        "firstName",
        "emailID",
      ]);
      options = Service.applyOrder(options, order, ["firstName", "emailID"]);

      const result = await AdminModel.findAndCountAll(options);
      const admin = result.rows;
      const formattedData = admin.map((element) => ({
        firstName: element.firstName || "-",
        // lastName: element.lastName,
        emailID: element.emailID,
        // password: element.password,
        // phoneNo: element.phoneNo,
        action: `<a href="/admin/edit/${element.id}" title="Edit Record" class="text-info"><button type="button" class="btn btn-info btn-sm"><i class="fas fa-edit"></i></button></a>
              <button type="button" onclick="deleteRecord('/admin/delete','${element.id}')" class="btn btn-danger btn-sm">
                  <i class="fas fa-solid fa-trash"></i>
              </button>`,
      }));
      let totalRecords = result.count;
      if (searchTerm === "") {
        totalRecords = await AdminModel.count({ where: { isDeleted: false } });
      }

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


  update: async function (req, res, next) {
    try {
      if (Service.hasValidatorErrorsBackend(req, res)) {
        return;
      }
      const {
        firstName,
        lastName,
        emailID,
        password,
        confirmPassword,
        phoneNo,
      } = req.body;

      // const checkEmail = await AdminModel.findByPk(req.params.id);
      const checkEmail = await adminRepo.getDetail(req.params.id)

      // const emailExists = await AdminModel.findOne({
      //   where: {
      //     emailID,
      //     id: { [Op.ne]: req.params.id },
      //   },
      // });
      const emailExists = await common.checkExist(AdminModel, { emailID }, req.params.id)
      if (emailExists) {
        return res
          .status(HttpStatus.BAD_REQUEST_STATUS_CODE)
          .send({ message: Msg.EMAIL_ALREADY_EXIST });
      }

      if (password && confirmPassword && password !== confirmPassword) {
        return res
          .status(HttpStatus.BAD_REQUEST_STATUS_CODE)
          .send({ message: Msg.PASSWORD_DOES_NOT_MATCH });
      }

      checkEmail.firstName = firstName;
      checkEmail.lastName = lastName;
      checkEmail.phoneNo = phoneNo;
      checkEmail.emailID = emailID;

      const userData = await checkEmail.save();
      if (!userData) {
        return res
          .status(HttpStatus.BAD_REQUEST_STATUS_CODE)
          .send({ message: Msg.SOMETHING_WENT_WRONG });
      }
      return res
        .status(HttpStatus.SUCCESS_CODE)
        .send({ message: Msg.ADMIN_UPDATE_SUCCESSFULLY, url: "/admin " });
    } catch (error) {
      next(error);
    }
  },

  delete: async function (req, res, next) {
    try {
      if (Service.hasValidatorErrorsBackend(req, res)) {
        return;
      }
      // const detail = await AdminModel.findByPk(req.body.id);
      const detail = await adminRepo.getDetail(req.body.id)
      if (!detail) {
        return res
          .status(HttpStatus.BAD_REQUEST_STATUS_CODE)
          .send({ message: Msg.ADMIN_NOT_FOUND });
      }
      detail.isDeleted = true;
      detail.save();
      return res
        .status(HttpStatus.SUCCESS_CODE)
        .send({ message: Msg.ADMIN_DELETE_SUCCESSFULLY, url: "/admin", tableId: "admin-table" });
    } catch (error) {
      next(error);
    }
  },
};
