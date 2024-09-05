const Service = require("../../helpers/index");
const ENUM = require("../../helpers/enum");
const LeadsModel = require("../../model/leads");
const { HttpStatus, ErrorCode } = require("../../errors/code");
const { Msg } = require("../../helpers/localization");

module.exports = {
    list: async function (req, res, next) {
        try {
            if (Service.hasValidatorErrorsBackend(req, res)) {
                return;
            }
            res.render("leads/index", {
                title: "Leads",
                route: "leads",
                tableId: "leads-table",
                loadList: "/leads/load-list",
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
                attributes: ["id", "name", "email", "phone", "city", "province", "country", "status"],
                limit: parseInt(length),
                offset: parseInt(start),
                where: {
                    isDeleted: false,
                },
                order: []
            };
            options = Service.applySearch(options, searchTerm, ["name", "email", "phone", "city", "province", "country"]);
            options = Service.applyOrder(options, order, ["name", "email", "phone", "city", "province", "country"]);

            const result = await LeadsModel.findAndCountAll(options);
            const leads = result.rows;
            const formattedData = await Promise.all(leads.map(async (element) => {
                const formattedElement = {
                    name: element.name,
                    email: element.email,
                    city: element.city,
                    phone: element.phone,
                    province: element.province,
                    country: element.country,
                    status: `<span class="badge 
                    ${element.status == 0 ? 'badge-primary' :
                            (element.status == 1 ? 'badge-success' :
                                'badge-danger')}">
                        ${element.status == 0 ? 'New' :
                            (element.status == 1 ? 'Succeed' :
                                'Rejected')}
                    </span>`
                    ,
                    action: `<button type="button" onclick="approveOrReject('lead-converted', '/leads/status-change','${element.id}')" class="btn btn-success btn-sm"><i class="fas fa-check-circle" aria-hidden="true"></i></button><button type="button" onclick="approveOrReject('lead-lost', '/leads/status-change','${element.id}')" class="btn btn-danger btn-sm"><i class="fa fa-ban" aria-hidden="true"></i></button>`

                };

                return formattedElement;
            }));
            const totalRecords = await LeadsModel.count({
                where: {
                    isDeleted: false,
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
    statusChange: async function (req, res, next) {
        try {
            if (Service.hasValidatorErrorsBackend(req, res)) {
                return;
            }
            const detail = await LeadsModel.findByPk(req.body.id);
            if (!detail) {
                return res
                    .status(HttpStatus.BAD_REQUEST_STATUS_CODE)
                    .send({ message: Msg.AUDITOR_DOCUMENT_NOT_FOUND });
            }
            if (req.body.action === "lead-converted") {
                detail.status = ENUM.LEAD_ID.CONVERTED;
                await detail.save();
                return res.status(HttpStatus.SUCCESS_CODE).send({
                    message: Msg.LEAD_CONNECTED,
                    url: "/leads",
                    tableId: "leads-table"
                });
            } else if (req.body.action === "lead-lost") {
                detail.status = ENUM.LEAD_ID.LOST;
                await detail.save();
            }
            return res.status(HttpStatus.SUCCESS_CODE).send({
                message: Msg.LEAD_REJECTED,
                url: "/leads",
                tableId: "leads-table"
            });
        } catch (error) {
            next(error);
        }
    },
};
