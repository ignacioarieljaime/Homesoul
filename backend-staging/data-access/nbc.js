const nbcModel = require("../model/nbc_tier");
/**
 * This function is use for create nbc
*/
async function create(userInfo) {
    const nbc = new nbcModel(userInfo);
    const nbcData = await nbc.save();
    return nbcData;
  }

/**
 * This function is use for the find data using id
 */
async function getDetail(id) {
  const checkNbc = await nbcModel.findByPk(id);
  return checkNbc
}

  module.exports = {
    create: create,
    getDetail: getDetail,
}