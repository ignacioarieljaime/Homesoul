const Service = require("../../helpers/index");
const ENUM = require("../../helpers/enum");
const UserModel = require("../../model/user");
const LeadsModel = require("../../model/leads");
const AuditsModel = require("../../model/audits");

module.exports = {
    dashboard: async function (req, res, next) {
        try {

            const auditorCount = await UserModel.count({
                where: {
                    isDeleted: false,
                    userType: ENUM.Type.Engineer,
                }
            });
            const customerCount = await UserModel.count({
                where: {
                    isDeleted: false,
                    userType: ENUM.Type.Customer,
                }
            });
            const leadsCount = await LeadsModel.count();
            const auditsCount = await AuditsModel.count();
            const data = {
                customerCount,
                auditorCount,
                leadsCount,
                auditsCount
            };
            const result = Service.toastrHandler(req)
            if (result == false) {
                res.render('layout/app', { title: 'Dashboard', filename: '../dashboard/index', route: 'dashboard', req: null, res: res, data: data });
            } else {
                res.render('layout/app', { title: 'Dashboard', filename: '../dashboard/index', route: 'dashboard', req: req, res: res, data: data });
            }

        } catch (error) {
            next(error);
        }
    },
}