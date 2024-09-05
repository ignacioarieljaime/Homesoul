const Service = require("../../helpers/index");
const AssemblyCategoryModel = require("../../model/assembly_category");
const { HttpStatus, ErrorCode } = require("../../errors/code");
const { Msg } = require("../../helpers/localization");
const assemblyCategoryRepo = require("../../data-access/assembly-category");

module.exports = {
    form: async function (req, res, next) {
        try {
            const itemId = req.params.id;
            var data = null;
            if (req.params !== null) {
                data = await AssemblyCategoryModel.findByPk(itemId);
            }
            if (data === null) {
                res.render('assembly-category/form', { title: "Add Form", route: "assembly-category", data: null, url: "/assembly-category/add", })
            } else {
                const newData = {
                    title: data.title,
                };
                res.render('assembly-category/form', { title: "Edit Form", route: "assembly-category", data: newData, url: "/assembly-category/update/" + itemId, })
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

            const { title } = req.body;
            const categoryInfo = { title };

            await assemblyCategoryRepo.create(categoryInfo)
            return res.status(HttpStatus.SUCCESS_CODE).send({ message: Msg.RECORD_ADD_SUCCESSFULLY, url: "/assembly-category" });
        } catch (error) {
            next(error);
        }
    },
    list: async function (req, res, next) {
        try {
            if (Service.hasValidatorErrorsBackend(req, res)) {
                return;
            }
            res.render('assembly-category/index', { title: "Assembly-Category", route: "assembly-category", tableId: "assembly-category-table", loadList: "/assembly-category/load-list", })
        } catch (error) {
            next(error);
        }
    },

    getList: async function (req, res, next) {
        try {
            const { draw, start, length, search, order } = req.query;
            const searchTerm = search.value || "";

            let options = {
                attributes: ["title", "id"],
                limit: parseInt(length),
                offset: parseInt(start),
                where: {
                    isDeleted: false,
                },
                order: [],
                raw: true,
            };

            options = Service.applySearch(options, searchTerm, ["title"]);
            options = Service.applyOrder(options, order, ["title"]);

            const result = await AssemblyCategoryModel.findAndCountAll(options);
            const assemblyCategory = result.rows;
            const formattedData = assemblyCategory.map((element) => ({
                title: element.title || "-",
                action: `<a href="/assembly-category/edit/${element.id}" title="Edit Record" class="text-info"><button type="button" class="btn btn-info btn-sm"><i class="fas fa-edit"></i></button></a>
                <button type="button" onclick="deleteRecord('/assembly-category/delete','${element.id}')" class="btn btn-danger btn-sm">
                    <i class="fas fa-solid fa-trash"></i>
                </button>`,
            }));

            let totalRecords = result.count;
            if (searchTerm === "") {
                totalRecords = await AssemblyCategoryModel.count({ where: { isDeleted: false } });
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

            const { title } = req.body;
            const checkAssemblyCategory = await nbcRepo.getDetail(req.params.id)
            if (!checkAssemblyCategory) { return res.status(HttpStatus.NOT_FOUND).send({ message: Msg.RECORD_NOT_FOUND }); }

            checkAssemblyCategory.title = title;

            const assemblyCategoryData = await checkAssemblyCategory.save();
            if (!assemblyCategoryData) { return res.status(HttpStatus.BAD_REQUEST_STATUS_CODE).send({ message: Msg.SOMETHING_WENT_WRONG }); }
            return res.status(HttpStatus.SUCCESS_CODE).send({ message: Msg.RECORD_UPDATE_SUCCESSFULLY, url: "/assembly-category", });
        } catch (error) {
            next(error);
        }
    },

    delete: async function (req, res, next) {
        try {
            if (Service.hasValidatorErrorsBackend(req, res)) {
                return;
            }
            const detail = await assemblyCategoryRepo.getDetail(req.body.id)
            if (!detail) { return res.status(HttpStatus.BAD_REQUEST_STATUS_CODE).send({ message: Msg.RECORD_NOT_FOUND }); }
            detail.isDeleted = true;
            detail.save();
            return res.status(HttpStatus.SUCCESS_CODE).send({ message: Msg.RECORD_ADD_SUCCESSFULLY, url: "/assembly-category", tableId: "assembly-category-table" });
        } catch (error) {
            next(error);
        }
    },
};
