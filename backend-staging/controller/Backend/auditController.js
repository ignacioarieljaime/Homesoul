const Service = require("../../helpers/index");
const ENUM = require("../../helpers/enum");
const AuditsModel = require("../../model/audits");
const RegionsModel = require("../../model/regions");
const AuditorModel = require("../../model/auditor");
const UserModel = require("../../model/user");
const { Op, Sequelize } = require('sequelize');

module.exports = {
    list: async function (req, res, next) {
        try {
            if (Service.hasValidatorErrorsBackend(req, res)) {
                return;
            }
            res.render("audit/index", {
                title: "Audits",
                route: "audit",
                tableId: "audit-table",
                loadList: "/audits/load-list",
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
                attributes: ["id", "firstName", "lastName", "auditorId", "emailId", "phone", "provinceId", "pincode1", "addressLine1", "addressLine2", "auditStatusId", "createdAt"],
                limit: parseInt(length),
                offset: parseInt(start),
                where: {
                    isDeleted: false,
                },
                include: [
                    {
                        model: RegionsModel,
                        attributes: ['regionTitle'],
                        as: 'RegionInfo',
                        required: false,
                    }
                ],
                order: []
            };

            options = Service.applySearch(options, searchTerm, ['firstName', 'lastName', 'emailId', "phone", "pincode1", "addressLine1", "addressLine2"]);
            options = Service.applyOrder(options, order, ['createdAt', 'firstName', 'lastName','auditorId', 'emailId', "phone", "pincode1", "addressLine1", "addressLine2"]);

            const result = await AuditsModel.findAndCountAll(options);
            const audits = result.rows;
            const formattedData = await Promise.all(audits.map(async (element) => {
                let name = '-';
                if (element.auditorId) {
                    const auditor = await AuditorModel.findByPk(element.auditorId);
                    const user = await UserModel.findByPk(auditor.userId);
                    name = `${user.firstName} ${user.lastName}`;
                }
                const formattedElement = {
                    date: Service.frDate(element.createdAt),
                    name: `${element.firstName} ${element.lastName}`,
                    auditor: name,
                    email: element.emailId,
                    phone: element.phone,
                    address: `${element.addressLine1} ${element.addressLine2}`,
                    province: element.RegionInfo ? element.RegionInfo.regionTitle : '-',
                    postalCode: element.pincode1 || '-',
                    status: ENUM.AUDIT_STATUS_NAME[element.auditStatusId],
                };
                return formattedElement;
            }));

            const totalRecords = result.count;
            res.json({
                draw: parseInt(draw),
                recordsTotal: totalRecords,
                recordsFiltered: totalRecords,
                data: formattedData,
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

};
