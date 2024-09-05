const Service = require("../../helpers/index");
const Assembly = require("../../model/assembly");
const AssemblyElementsModel = require("../../model/assembly_elements");
const { HttpStatus, ErrorCode } = require("../../errors/code");
const { Msg } = require("../../helpers/localization");

module.exports = {
    form: async function (req, res, next) {
        try {
            const itemId = req.params.id;
            const assemblyId = req.params.assemblyId;
            var data = null;
            if (req.params !== null) {
                data = await AssemblyElementsModel.findByPk(itemId);
            }
            if (data === null) {
                res.render('assembly-elements/form', { title: "Add Form", route: "assembly", data: null, url: "/assembly-elements/add/" + assemblyId, backUrl: "/assembly/edit/" + assemblyId })
            } else {
                const newData = {
                    assemblyId: data.assemblyId,
                    elementTitle: data.elementTitle,
                    elementDetails: data.elementDetails,
                    table: data.table,
                    effectiveRSI: data.effectiveRSI,
                    totalEffectiveRValue: data.totalEffectiveRValue,
                };
                res.render('assembly-elements/form', { title: "Edit Form", route: "assembly", data: newData, url: "/assembly-elements/update/" + itemId + "/" + assemblyId, backUrl: "/assembly/edit/" + assemblyId })
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
            const assemblyId = req.params.assemblyId;

            const { elementTitle, elementDetails, table, effectiveRSI } = req.body;

            const assemblyElementInfo = {
                assemblyId: assemblyId,
                elementTitle,
                elementDetails,
                table,
                effectiveRSI,
            };

            const assemblyElement = new AssemblyElementsModel(assemblyElementInfo);
            assemblyElement.save();

            return res.status(HttpStatus.SUCCESS_CODE).send({ message: Msg.RECORD_ADD_SUCCESSFULLY, url: "/assembly/edit/" + assemblyId });
        } catch (error) {
            next(error);
        }
    },

    // list: async function (req, res, next) {
    //     try {
    //         if (Service.hasValidatorErrorsBackend(req, res)) {
    //             return;
    //         }
    //         res.render('assembly-elements/index', { title: "Assembly Elements", route: "assembly-elements", tableId: "assembly-elements-table", loadList: "/assembly-elements/load-list", })
    //     } catch (error) {
    //         next(error);
    //     }
    // },

    // getList: async function (req, res, next) {
    //     try {
    //         const { draw, start, length, search, order } = req.query;
    //         const searchTerm = search.value || "";

    //         let options = {
    //             attributes: ["assemblyId", "elementTitle", "elementDetails", "table", "effectiveRSI", "id"],
    //             // include: [{ model: Assembly, attributes: ['assemblyTitle'], where: { isDeleted: false } }],
    //             limit: parseInt(length),
    //             offset: parseInt(start),
    //             where: {
    //                 isDeleted: false,
    //             },
    //             order: [],
    //             raw: true,
    //         };
    //         options = Service.applySearch(options, searchTerm, ["elementTitle", "elementDetails", "table", "effectiveRSI"]);
    //         options = Service.applyOrder(options, order, ["elementTitle", "elementDetails", "table", "effectiveRSI"]);
    //         const result = await AssemblyElementsModel.findAndCountAll(options);
    //         const assemblies = result.rows;
    //         const formattedData = assemblies.map((element) => ({
    //             assemblyTitle: element['assembly.assemblyTitle'] || '-',
    //             elementTitle: element.elementTitle,
    //             elementDetails: element.elementDetails,
    //             table: element.table,
    //             effectiveRSI: element.effectiveRSI,
    //             action: `<a href="/assembly-elements/edit/${element.id}" title="Edit Record" class="text-info"><button type="button" class="btn btn-info btn-sm"><i class="fas fa-edit"></i></button></a>
    //                     <button type="button" onclick="deleteRecord('/assembly-elements/delete','${element.id}')" class="btn btn-danger btn-sm">
    //                         <i class="fas fa-solid fa-trash"></i>
    //                     </button>`,
    //         }));

    //         let totalRecords = result.count;
    //         if (searchTerm === "") {
    //             totalRecords = await AssemblyElementsModel.count({ where: { isDeleted: false } });
    //         }
    //         res.json({
    //             draw: parseInt(draw),
    //             recordsTotal: totalRecords,
    //             recordsFiltered: result.count,
    //             data: formattedData,
    //         });
    //     } catch (error) {
    //         next(error);
    //     }
    // },

    update: async function (req, res, next) {
        try {
            if (Service.hasValidatorErrorsBackend(req, res)) {
                return;
            }
            const assemblyId = req.params.assemblyId;

            const { elementTitle, elementDetails, table, effectiveRSI } = req.body;
            const checkAssemblyElements = await AssemblyElementsModel.findByPk(req.params.id);
            if (!checkAssemblyElements) { return res.status(HttpStatus.NOT_FOUND).send({ message: Msg.RECORD_NOT_FOUND }); }

            checkAssemblyElements.assemblyId = assemblyId;
            checkAssemblyElements.elementTitle = elementTitle;
            checkAssemblyElements.elementDetails = elementDetails;
            checkAssemblyElements.table = table;
            checkAssemblyElements.effectiveRSI = effectiveRSI;

            const assemblyElementsData = await checkAssemblyElements.save();
            if (!assemblyElementsData) { return res.status(HttpStatus.BAD_REQUEST_STATUS_CODE).send({ message: Msg.SOMETHING_WENT_WRONG }); }
            return res.status(HttpStatus.SUCCESS_CODE).send({ message: Msg.RECORD_UPDATE_SUCCESSFULLY, url: "/assembly/edit/" + assemblyId, });
        } catch (error) {
            next(error);
        }
    },

    delete: async function (req, res, next) {
        try {
            if (Service.hasValidatorErrorsBackend(req, res)) {
                return;
            }
            const assemblyId = req.params.assemblyId;
            const detail = await AssemblyElementsModel.findByPk(req.body.id);
            if (!detail) { return res.status(HttpStatus.BAD_REQUEST_STATUS_CODE).send({ message: Msg.RECORD_NOT_FOUND }); }

            detail.isDeleted = true;
            detail.save();

            return res.status(HttpStatus.SUCCESS_CODE).send({ message: Msg.RECORD_DELETE_SUCCESSFULLY, url: "/assembly/edit/" + assemblyId, tableId: 'assembly-elements' });
        } catch (error) {
            next(error);
        }
    },
};
