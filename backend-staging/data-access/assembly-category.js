const AssemblyCategoryModel = require("../model/assembly_category");
/**
 * This function is use for create nbc
*/
async function create(userInfo) {
    const assemblyCategory = new AssemblyCategoryModel(userInfo);
    const assemblyCategoryData = await assemblyCategory.save();
    return assemblyCategoryData;
  }

/**
 * This function is use for the find data using id
 */
async function getDetail(id) {
  const checkAssemblyCategory = await AssemblyCategoryModel.findByPk(id);
  return checkAssemblyCategory
}

  module.exports = {
    create: create,
    getDetail: getDetail,
}