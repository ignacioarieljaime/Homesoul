adminModel = require("../model/admin");

/**
 * This function is use for the find data using id
 */
async function getDetail(id) {
    const checkAdmin = await adminModel.findByPk(id);
    return checkAdmin
  }

module.exports = {
    getDetail: getDetail
}