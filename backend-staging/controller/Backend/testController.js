const Service = require("../../helpers/index");
const sendView = Service.sendView;
const testModel = require("../../model/testing");
const { HttpStatus, ErrorCode } = require("../../errors/code");
const { Msg } = require("../../helpers/localization");
const nbcRepo = require("../../data-access/nbc");

module.exports = {
    form: async function (req, res, next) {
        try {
            const itemId = req.params.id;
            var data = null;
            if (req.params !== null) {
                data = await testModel.findByPk(itemId);
            }
            if (data === null) {
                sendView(res, { title: 'Add Form', filename: '../test/form', route: 'test', data: null, url: '/test/add' })
            } else {
                const newData = {
                    title: data.title,
                    desc: data.desc,
                };
                sendView(res, { title: 'Edit Form', filename: '../test/form', route: 'test', data: newData, url: "/test/update/" + itemId })
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

            const { title, desc } = req.body;

            await testModel.findAll()
            const testInfo = {
                title,
                desc
            };

            const test = new testModel(testInfo);
            test.save();
            return res.status(HttpStatus.SUCCESS_CODE).send({ message: Msg.RECORD_ADD_SUCCESSFULLY, url: "/test" });
        } catch (error) {
            next(error);
        }
    },
    list: async function (req, res, next) {
        try {
            if (Service.hasValidatorErrorsBackend(req, res)) {
                return;
            }
            sendView(res, { title: 'Test', filename: '../test/index', route: 'test', tableId: "test-table", loadList: '/test/load-list' })
        } catch (error) {
            next(error);
        }
    },

    getList: async function (req, res, next) {
        try {
            const { draw, start, length, search, order } = req.query;
            const searchTerm = search.value || "";

            let options = {
                attributes: ["title", "desc", "id"],
                limit: parseInt(length),
                offset: parseInt(start),
                where: {
                    isDeleted: false,
                },
                order: [],
                raw: true,
            };

            options = Service.applySearch(options, searchTerm, ["title", "desc"]);
            options = Service.applyOrder(options, order, ["title", "desc"]);

            const result = await testModel.findAndCountAll(options);
            const test = result.rows;
            const formattedData = test.map((element) => ({
                title: element.title || "-",
                desc: element.desc,
                action: `<a href="/test/edit/${element.id}" title="Edit Record" class="text-info"><button type="button" class="btn btn-info btn-sm"><i class="fas fa-edit"></i></button></a>
                <button type="button" onclick="deleteRecord('/test/delete','${element.id}')" class="btn btn-danger btn-sm">
                    <i class="fas fa-solid fa-trash"></i>
                </button>`,
            }));

            let totalRecords = result.count;
            if (searchTerm === "") {
                totalRecords = await testModel.count({ where: { isDeleted: false } });
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

            const { title, desc } = req.body;

            const checkTest = await testModel.findByPk(req.params.id);
            if (!checkTest) { return res.status(HttpStatus.NOT_FOUND).send({ message: Msg.RECORD_NOT_FOUND }); }

            checkTest.title = title;
            checkTest.desc = desc;

            const testData = await checkTest.save();
            if (!testData) { return res.status(HttpStatus.BAD_REQUEST_STATUS_CODE).send({ message: Msg.SOMETHING_WENT_WRONG }); }
            return res.status(HttpStatus.SUCCESS_CODE).send({ message: Msg.RECORD_UPDATE_SUCCESSFULLY, url: "/test", });
        } catch (error) {
            next(error);
        }
    },

    delete: async function (req, res, next) {
        try {
            if (Service.hasValidatorErrorsBackend(req, res)) {
                return;
            }
            const detail = await testModel.findByPk(req.body.id);
            if (!detail) { return res.status(HttpStatus.BAD_REQUEST_STATUS_CODE).send({ message: Msg.RECORD_NOT_FOUND }); }

            detail.isDeleted = true;
            detail.save();
            return res.status(HttpStatus.SUCCESS_CODE).send({ message: Msg.NBC_DELETE_SUCCESSFULLY, tableId: 'test-table', url: "/test" });
        } catch (error) {
            next(error);
        }
    },
};
