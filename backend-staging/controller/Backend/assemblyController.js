const Service = require("../../helpers/index");
const AssemblyModel = require("../../model/assembly");
const AssemblyCategoryModel = require("../../model/assembly_category");
const AssemblyElementsModel = require("../../model/assembly_elements");
const { HttpStatus, ErrorCode } = require("../../errors/code");
const { Msg } = require("../../helpers/localization");

module.exports = {
    form: async function (req, res, next) {
        try {
            const itemId = req.params.id;
            var data = null;
            if (req.params !== null) {
                data = await AssemblyModel.findByPk(itemId);
            }
            const assemblyCategory = await AssemblyCategoryModel.findAll({
                attributes: ["id", "title"],
            })
            if (data === null) {
                res.render('assembly/form', { title: "Add Form", route: "assembly", data: null, url: "/assembly/add", assemblyCategories: assemblyCategory, tableId: 'assembly-elements', loadList: "/assembly/elements-list/0", assemblyId: itemId })
            } else {
                const newData = {
                    assemblyCategoryId: data.assemblyCategoryId,
                    assemblyTitle: data.assemblyTitle,
                    subTitle: data.subTitle,
                    standardCost: data.standardCost,
                    totalEffectiveRSI: data.totalEffectiveRSI,
                    totalEffectiveRValue: data.totalEffectiveRValue,
                    max_uValue: data.max_uValue,
                    min_energy_rating: data.min_energy_rating,
                    energy_efficiency: data.energy_efficiency,
                    homeType: data.homeType,
                    levels: data.levels


                };
                res.render('assembly/form', { title: "Edit Form", route: "assembly", data: newData, url: "/assembly/update/" + itemId, assemblyCategories: assemblyCategory, tableId: 'assembly-elements', loadList: "/assembly/elements-list/" + itemId, assemblyId: itemId })
            }
        } catch (error) {
            next(error);
        }
    },
    elementsList: async function (req, res, next) {
        try {
            const itemId = req.params.id;
            const { draw, start, length, search, order } = req.query;
            const searchTerm = search.value || "";

            let options = {
                attributes: ["assemblyId", "elementTitle", "elementDetails", "table", "effectiveRSI", "id"],
                limit: parseInt(length),
                offset: parseInt(start),
                where: {
                    isDeleted: false,
                    assemblyId: itemId
                },
                order: [],
                raw: true,
            };
            options = Service.applySearch(options, searchTerm, ["elementTitle", "elementDetails", "table", "effectiveRSI"]);
            options = Service.applyOrder(options, order, ["elementTitle", "elementDetails", "table", "effectiveRSI"]);
            const result = await AssemblyElementsModel.findAndCountAll(options);
            const assemblies = result.rows;
            const formattedData = assemblies.map((element) => ({
                elementTitle: element.elementTitle,
                elementDetails: element.elementDetails,
                table: element.table,
                effectiveRSI: element.effectiveRSI,
                action: `<a href="/assembly-elements/edit/${element.id}/${itemId}" title="Edit Record" class="text-info"><button type="button" class="btn btn-info btn-sm"><i class="fas fa-edit"></i></button></a>
                        <button type="button" onclick="deleteRecord('/assembly-elements/delete/${itemId}','${element.id}')" class="btn btn-danger btn-sm">
                            <i class="fas fa-solid fa-trash"></i>
                        </button>`,
            }));

            let totalRecords = result.count;
            if (searchTerm === null) {
                totalRecords = await AssemblyElementsModel.count({ where: { isDeleted: false } });
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
    add: async function (req, res, next) {
        try {
            if (Service.hasValidatorErrorsBackend(req, res)) {
                return;
            }

            const { assemblyCategoryId, assemblyTitle, subTitle, standardCost, totalEffectiveRSI, totalEffectiveRValue, max_uValue, min_energy_rating, energy_efficiency, homeType, levels } = req.body;

            await AssemblyModel.findAll()
            const assemblyInfo = {
                assemblyCategoryId: assemblyCategoryId,
                assemblyTitle,
                subTitle,
                standardCost,
                totalEffectiveRSI,
                totalEffectiveRValue,
                max_uValue: max_uValue ? max_uValue : null,
                min_energy_rating: min_energy_rating ? min_energy_rating : null,
                energy_efficiency: energy_efficiency ? energy_efficiency : null,
                homeType: homeType ? homeType : 0,
                levels: levels ? levels : null
            };

            const assembly = new AssemblyModel(assemblyInfo);
            await assembly.save();
            const assemblyId = assembly.id;
            return res.status(HttpStatus.SUCCESS_CODE).send({ message: Msg.RECORD_ADD_SUCCESSFULLY, url: "/assembly/edit/" + assemblyId });
        } catch (error) {
            next(error);
        }
    },

    list: async function (req, res, next) {
        try {
            if (Service.hasValidatorErrorsBackend(req, res)) {
                return;
            }
            res.render('assembly/index', { title: "Assembly", route: "assembly", tableId: "assembly-table", loadList: "/assembly/load-list", })
        } catch (error) {
            next(error);
        }
    },

    getList: async function (req, res, next) {
        try {
            const { draw, start, length, search, order } = req.query;
            const searchTerm = search.value || "";

            let options = {
                attributes: ["assemblyCategoryId", "assemblyTitle", "subTitle", "standardCost", "totalEffectiveRSI", "totalEffectiveRValue", "id"],
                include: [{ model: AssemblyCategoryModel, attributes: ['title'], where: { isDeleted: false } }],
                limit: parseInt(length),
                offset: parseInt(start),
                where: {
                    isDeleted: false,
                },
                order: [],
                raw: true,
            };
            options = Service.applySearch(options, searchTerm, ["assemblyTitle", "subTitle", "standardCost", "totalEffectiveRSI", "totalEffectiveRValue"]);
            options = Service.applyOrder(options, order, ["assemblyTitle", "subTitle", "standardCost", "totalEffectiveRSI", "totalEffectiveRValue"]);
            const result = await AssemblyModel.findAndCountAll(options);
            const assembly = result.rows;
            const formattedData = assembly.map((element) => ({
                assemblyCategory: element['assembly_category.title'],
                assemblyTitle: element.assemblyTitle,
                subTitle: element.subTitle,
                standardCost: element.standardCost,
                totalEffectiveRSI: element.totalEffectiveRSI,
                totalEffectiveRValue: element.totalEffectiveRValue,
                action: `<a href="/assembly/edit/${element.id}" title="Edit Record" class="text-info"><button type="button" class="btn btn-info btn-sm"><i class="fas fa-edit"></i></button></a>
                        <button type="button" onclick="deleteRecord('/assembly/delete','${element.id}')" class="btn btn-danger btn-sm">
                            <i class="fas fa-solid fa-trash"></i>
                        </button>`,
            }));

            let totalRecords = result.count;
            if (searchTerm === "") {
                totalRecords = await AssemblyModel.count({ where: { isDeleted: false } });
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

            const { assemblyCategoryId, assemblyTitle, subTitle, standardCost, totalEffectiveRSI, totalEffectiveRValue, max_uValue, min_energy_rating, energy_efficiency, homeType, levels } = req.body;
            const checkAssembly = await AssemblyModel.findByPk(req.params.id);
            if (!checkAssembly) { return res.status(HttpStatus.NOT_FOUND).send({ message: Msg.RECORD_NOT_FOUND }); }

            // console.log(checkAssembly);
            checkAssembly.assemblyCategoryId = assemblyCategoryId;
            checkAssembly.assemblyTitle = assemblyTitle;
            checkAssembly.subTitle = subTitle;
            checkAssembly.standardCost = standardCost;
            checkAssembly.totalEffectiveRSI = totalEffectiveRSI;
            checkAssembly.totalEffectiveRValue = totalEffectiveRValue;
            checkAssembly.max_uValue = max_uValue ? max_uValue : null;
            checkAssembly.min_energy_rating = min_energy_rating ? min_energy_rating : null;
            checkAssembly.energy_efficiency = energy_efficiency ? energy_efficiency : null;
            checkAssembly.homeType = homeType ? homeType : 0;
            checkAssembly.levels = levels ? levels : null;


            const assemblyData = await checkAssembly.save();
            if (!assemblyData) { return res.status(HttpStatus.BAD_REQUEST_STATUS_CODE).send({ message: Msg.SOMETHING_WENT_WRONG }); }
            return res.status(HttpStatus.SUCCESS_CODE).send({ message: Msg.RECORD_UPDATE_SUCCESSFULLY, url: "/assembly", });
        } catch (error) {
            next(error);
        }
    },

    delete: async function (req, res, next) {
        try {
            if (Service.hasValidatorErrorsBackend(req, res)) {
                return;
            }
            const detail = await AssemblyModel.findByPk(req.body.id);
            if (!detail) { return res.status(HttpStatus.BAD_REQUEST_STATUS_CODE).send({ message: Msg.RECORD_NOT_FOUND }); }

            detail.isDeleted = true;
            detail.save();

            return res.status(HttpStatus.SUCCESS_CODE).send({ message: Msg.RECORD_DELETE_SUCCESSFULLY, url: "/assembly", tableId: "assembly-table" });
        } catch (error) {
            next(error);
        }
    },
};
