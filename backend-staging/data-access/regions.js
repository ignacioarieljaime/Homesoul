const regionsModel = require("../model/regions");



/**
 * This function is use for create nbc
*/
async function create(userInfo) {
    const region = new regionsModel(userInfo);
    const regionData = await region.save();
    return regionData;
  }

module.exports = {
    create: create
}