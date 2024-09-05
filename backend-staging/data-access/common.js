const { Op } = require("sequelize");

async function findOne(model, filter) {
    return await model.findOne({ where: filter });
}

async function create(model, data) {
    return await model.create(data);
}

async function listForDataTables(model, columns, searchData, start, length, order) {
    const { search, regex } = searchData;
    const { column, dir } = order[0];
    const offset = start;
    const limit = length;

    const whereClause = {};
    const searchClause = [];

    if (search.value) {
        columns.forEach(col => {
            if (col.searchable) {
                searchClause.push({ [col.data]: { [Op.like]: `%${search.value}%` } });
            }
        });
    }

    if (searchClause.length > 0) {
        whereClause[Op.or] = searchClause;
    }

    const totalCount = await model.count({ where: whereClause });
    const data = await model.findAll({
        where: whereClause,
        order: [[column, dir]],
        offset: offset,
        limit: limit
    });

    return {
        recordsFiltered: totalCount,
        recordsTotal: totalCount,
        data: data
    };
}

async function findAndCountAll(model, matchFilter, skip, perPage, sortObj) {
    const { count, rows } = await model.findAndCountAll({
        where: matchFilter,
        offset: skip,
        limit: perPage,
        order: sortObj
    });
    return { list: rows, total: count };
}

async function update(model, filter, detail) {
    const [updated] = await model.update(detail, { where: filter });
    return updated;
}

async function deleteOne(model, filter) {
    const deleted = await model.destroy({ where: filter });
    return deleted;
}

async function deleteMany(model, filter, key) {
    const deleted = await model.update({ isDeleted: true, image: null }, { where: { [key]: { [Op.in]: filter } } });
    return deleted;
}

async function checkExist(model, filter, userId) {
    if (userId !== undefined) {
        filter.id = { [Op.ne]: userId };
    }
    return await findOne(model, filter);
}

module.exports = {
    findOne: findOne,
    create: create,
    findAndCountAll: findAndCountAll,
    listForDataTables: listForDataTables,
    update: update,
    checkExist: checkExist,
    deleteOne: deleteOne,
    deleteMany: deleteMany
};
