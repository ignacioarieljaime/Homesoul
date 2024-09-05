const Service = require("../../helpers/index");
const nbcModel = require("../../model/nbc_tier");
const { HttpStatus, ErrorCode } = require("../../errors/code");
const { Msg } = require("../../helpers/localization");
const nbcRepo = require("../../data-access/nbc");

module.exports = {
  form: async function (req, res, next) {
    try {
      const itemId = req.params.id;
      var data = null;
      if (req.params !== null) {
        data = await nbcModel.findByPk(itemId);
      }
      if (data === null) {
        res.render('nbc/form', { title: "Add Form", route: "nbc", data: null, url: "/nbc/add", })
      } else {
        const newData = {
          nbcTierTitle: data.nbcTierTitle,
          ecPoints: data.ecPoints,
        };
        res.render('nbc/form', { title: "Edit Form", route: "nbc", data: newData, url: "/nbc/update/" + itemId, })
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

      const { nbcTierTitle, ecPoints } = req.body;
      const nbcInfo = { nbcTierTitle, ecPoints };
      await nbcRepo.create(nbcInfo)
      return res.status(HttpStatus.SUCCESS_CODE).send({ message: Msg.NBC_ADD_SUCCESSFULLY, url: "/nbc" });
    } catch (error) {
      next(error);
    }
  },
  list: async function (req, res, next) {
    try {
      if (Service.hasValidatorErrorsBackend(req, res)) {
        return;
      }
      return res.render('nbc/index', { title: "NBC", route: "nbc", tableId: "nbc-table", loadList: "/nbc/load-list", })
    } catch (error) {
      next(error);
    }
  },

  getList: async function (req, res, next) {
    try {
      const { draw, start, length, search, order } = req.query;
      const searchTerm = search.value || "";

      let options = {
        attributes: ["ecPoints", "nbcTierTitle", "id"],
        limit: parseInt(length),
        offset: parseInt(start),
        where: {
          isDeleted: false,
        },
        order: [],
        raw: true,
      };

      options = Service.applySearch(options, searchTerm, ["nbcTierTitle", "ecPoints"]);
      options = Service.applyOrder(options, order, ["nbcTierTitle", "ecPoints"]);

      const result = await nbcModel.findAndCountAll(options);
      const nbc = result.rows;
      const formattedData = nbc.map((element) => ({
        nbcTierTitle: element.nbcTierTitle || "-",
        ecPoints: element.ecPoints,
        action: `<a href="/nbc/edit/${element.id}" title="Edit Record" class="text-info"><button type="button" class="btn btn-info btn-sm"><i class="fas fa-edit"></i></button></a>
                <button type="button" onclick="deleteRecord('/nbc/delete','${element.id}')" class="btn btn-danger btn-sm">
                    <i class="fas fa-solid fa-trash"></i>
                </button>`,
      }));

      let totalRecords = result.count;
      if (searchTerm === "") {
        totalRecords = await nbcModel.count({ where: { isDeleted: false } });
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

      const { nbcTierTitle, ecPoints } = req.body;
      const checkNbc = await nbcRepo.getDetail(req.params.id)
      if (!checkNbc) { return res.status(HttpStatus.NOT_FOUND).send({ message: Msg.NBC_NOT_FOUND }); }

      checkNbc.nbcTierTitle = nbcTierTitle;
      checkNbc.ecPoints = ecPoints;

      const nbcData = await checkNbc.save();
      if (!nbcData) { return res.status(HttpStatus.BAD_REQUEST_STATUS_CODE).send({ message: Msg.SOMETHING_WENT_WRONG }); }
      return res.status(HttpStatus.SUCCESS_CODE).send({ message: Msg.NBC_UPDATE_SUCCESSFULLY, url: "/nbc", });
    } catch (error) {
      next(error);
    }
  },

  delete: async function (req, res, next) {
    try {
      if (Service.hasValidatorErrorsBackend(req, res)) {
        return;
      }
      const detail = await nbcRepo.getDetail(req.body.id)
      if (!detail) { return res.status(HttpStatus.BAD_REQUEST_STATUS_CODE).send({ message: Msg.NBC_NOT_FOUND }); }
      detail.isDeleted = true;
      detail.save();
      return res.status(HttpStatus.SUCCESS_CODE).send({ message: Msg.NBC_DELETE_SUCCESSFULLY, url: "/nbc", tableId: "nbc-table" });
    } catch (error) {
      next(error);
    }
  },
};
