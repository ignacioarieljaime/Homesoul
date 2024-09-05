const Service = require("../../helpers/index");
const regionsModel = require("../../model/regions");
const { HttpStatus, ErrorCode } = require("../../errors/code");
const { Msg } = require("../../helpers/localization");
const { Op } = require("sequelize");
const regionsRepo = require("../../data-access/regions");

module.exports = {
  form: async function (req, res, next) {
    try {
      const itemId = req.params.id;
      var data = null;
      if (req.params !== null) {
        data = await regionsModel.findByPk(itemId);
      }
      if (data === null) {
        res.render('regions/form', { title: "Add Form", route: "regions", data: null, url: "/regions/add", })
      } else {
        const newData = {
          regionCode: data.regionCode,
          regionTitle: data.regionTitle,
        };
        res.render('regions/form', { title: "Edit Form", route: "regions", data: newData, url: "/regions/update/" + itemId, })
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

      const { regionCode, regionTitle } = req.body;
      const regionInfo = { regionCode, regionTitle };

      await regionsRepo.create(regionInfo);
      return res.status(HttpStatus.SUCCESS_CODE).send({ message: Msg.REGIONS_ADD_SUCCESSFULLY, url: "/regions" });
    } catch (error) {
      next(error);
    }
  },

  list: async function (req, res, next) {
    try {
      if (Service.hasValidatorErrorsBackend(req, res)) {
        return;
      }
      res.render('regions/index', { title: "Region", route: "regions", tableId: "regions-table", loadList: "/regions/load-list", })
    } catch (error) {
      next(error);
    }
  },

  getList: async function (req, res, next) {
    try {
      const { draw, start, length, search, order } = req.query;
      const searchTerm = search.value || "";

      let options = {
        attributes: ["regionCode", "regionTitle", "id"],
        limit: parseInt(length),
        offset: parseInt(start),
        where: {
          isDeleted: false,
        },
        order: [],
        raw: true,
      };

      options = Service.applySearch(options, searchTerm, ["regionCode", "regionTitle"]);
      options = Service.applyOrder(options, order, ["regionCode", "regionTitle"]);

      const result = await regionsModel.findAndCountAll(options);
      const region = result.rows;
      const formattedData = region.map((element) => ({
        regionCode: element.regionCode || "-",
        regionTitle: element.regionTitle,
        action: `<a href="/regions/edit/${element.id}" title="Edit Record" class="text-info"><button type="button" class="btn btn-info btn-sm"><i class="fas fa-edit"></i></button></a>
                      <button type="button" onclick="deleteRecord('/regions/delete','${element.id}')" class="btn btn-danger btn-sm">
                          <i class="fas fa-solid fa-trash"></i>
                      </button>`,
      }));
      let totalRecords = result.count;
      if (searchTerm === "") {
        totalRecords = await regionsModel.count({ where: { isDeleted: false } });
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

      const { regionTitle, regionCode } = req.body;
      const checkRegion = await regionsModel.findByPk(req.params.id);
      if (!checkRegion) { return res.status(HttpStatus.NOT_FOUND).send({ message: Msg.REGIONS_NOT_FOUND_NOT_FOUND }); }

      checkRegion.regionCode = regionCode;
      checkRegion.regionTitle = regionTitle;

      const regionData = await checkRegion.save();
      if (!regionData) { return res.status(HttpStatus.BAD_REQUEST_STATUS_CODE).send({ message: Msg.SOMETHING_WENT_WRONG }); }
      return res.status(HttpStatus.SUCCESS_CODE).send({ message: Msg.REGIONS_UPDATE_SUCCESSFULLY_UPDATE_SUCCESSFULLY, url: "/regions", });
    } catch (error) {
      next(error);
    }
  },

  delete: async function (req, res, next) {
    try {
      if (Service.hasValidatorErrorsBackend(req, res)) {
        return;
      }
      const detail = await regionsModel.findByPk(req.body.id);
      if (!detail) { return res.status(HttpStatus.BAD_REQUEST_STATUS_CODE).send({ message: Msg.REGIONS_NOT_FOUND }); }

      detail.isDeleted = true;
      detail.save();

      return res.status(HttpStatus.SUCCESS_CODE).send({ message: Msg.REGIONS_DELETE_SUCCESSFULLY, url: "/regions", tableId: "regions-table" });
    } catch (error) {
      next(error);
    }
  },
};
