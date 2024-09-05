
const Service = require("../../../helpers/index");
const ENUM = require("../../../helpers/enum");
const { Msg } = require("../../../helpers/localization");
const PropertyModel = require('../../../model/property');
const RegionModel = require("../../../model/regions");
module.exports = {

    addProperty: async function (req, res, next) {
        try {
            if (Service.hasValidatorErrors(req, res)) {
                return;
            }
            const user = req.authUser;

            let propertyDetails = {
                userId: user.id,
                type: req.body.type,
                title: req.body.title,
                address: req.body.address,
                city: req.body.city,
                provinceId: req.body.provinceId,
                postalCode: req.body.postalCode,
            };
            const property = await PropertyModel.create(propertyDetails);
            return await Service.getSuccessResponse(Msg.CREATE_PROPERTY_SUCCESS, res);
        } catch (error) {
            return await Service.getInternalServerErrorResponse(error.message, res);
        }
    },
    getProperties: async function (req, res, next) {
        try {

            const user = req.authUser;

            let whereClause = {};
            const { page } = req.query;
            let perPage = 4;
            let skip = 0;

            if (page) {
                const paginationData = Service.parsePagination({ perPage, page });
                perPage = paginationData.perPage;
                skip = paginationData.skip;
            }
            whereClause = {
                userId: user.id,
            };
            const { count, rows } = await PropertyModel.findAndCountAll({
                include: [
                    {
                        model: RegionModel,
                        as: "regions",
                        attributes: ["regionCode", "regionTitle"],
                    }
                ],
                where: {
                    ...whereClause
                },
                limit: perPage,
                offset: skip,
                order: [['createdAt', 'DESC']]
            });
            const totalPage = Math.ceil(count / perPage);

            const formattedData = rows.map(row => ({
                id: row.id,
                userId: row.userId,
                type: ENUM.PROPERTY_TYPE_NAME[row.type],
                title: row.title,
                address: row.address,
                city: row.city,
                provinceId: row.provinceId,
                provinceName: row.regions.regionTitle,
                postalCode: row.postalCode,
                status: row.status,
            }));
            const paginationResponse = {
                properties: formattedData,
                perPage: perPage,
                currentPageRecordCount: rows.length,
                totalRecord: count,
                totalPage: totalPage,
            };

            return await Service.getSuccessResponse(Msg.SUCCESS_MESSAGE, res, paginationResponse);
        } catch (error) {
            return await Service.getInternalServerErrorResponse(error.message, res);
        }
    }
}