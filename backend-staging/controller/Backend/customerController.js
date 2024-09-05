const Service = require("../../helpers/index");
const ENUM = require("../../helpers/enum");
const UserModel = require("../../model/user");

module.exports = {
    list: async function (req, res, next) {
        try {
            if (Service.hasValidatorErrorsBackend(req, res)) {
                return;
            }
            res.render("customer/index", {
                title: "Customer",
                route: "customer",
                tableId: "customer-table",
                loadList: "/customer/load-list",
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
                attributes: ["id", "firstName", "lastName", "emailID", "addressLine1", "addressLine2", "is_offline"],
                limit: parseInt(length),
                offset: parseInt(start),
                where: {
                    isDeleted: false,
                    userType: ENUM.Type.Customer
                },
                order: []
            };
            options = Service.applySearch(options, searchTerm, ['firstName', 'lastName', 'emailID', "addressLine1", "addressLine2", "is_offline"]);
            options = Service.applyOrder(options, order, ['firstName', 'lastName', 'emailID', "addressLine1", "addressLine2", "is_offline"]);

            const result = await UserModel.findAndCountAll(options);
            const users = result.rows;
            const formattedData = await Promise.all(users.map(async (element) => {
                const formattedElement = {
                    firstName: element.firstName,
                    lastName: element.lastName,
                    emailID: element.emailID,
                    addressLine1: element.addressLine1,
                    addressLine2: element.addressLine2,
                    status : element.is_offline === 1 ? "Offline" : "Registered" 
                };

                return formattedElement;
            }));
            const totalRecords = await UserModel.count({
                where: {
                    isDeleted: false,
                    userType: ENUM.Type.Customer,
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
    }
};
