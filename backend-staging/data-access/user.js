const userModel = require("../model/user");
const { applyUpdate } = require('./helper');
const Service = require("../helpers/index");
const TRACKING_FIELDS = ['name', 'companyName', 'email', 'isDeleted', 'phone', 'status', 'password', 'iNewsletter','postcode','country','address']
/**
 * This function is use for user by filter
 *
 * @param {any} filter - filter
 * @returns {any} user
 */
async function getDetail(filter) {
  const user = await userModel.findOne({ ...filter, isDeleted: false });
  return user;
}

/**
 * This function is use for create user
 *
 * @param {any} userInfo - userInfo
 * @returns
 */
async function create(userInfo) {
  const user = new userModel(userInfo);
  const userData = await user.save();
  return userData;
}

/**
 * This function is use for list user
 *
 * @param {any} matchFilter - matchFilter
 * @param {Number} perPage - perPage
 * @param {Number} page - page
 * @param {any} sortObj - sortObj
 * @returns
 */
async function list(matchFilter, skip, perPage, sortObj) {
  matchFilter.isDeleted = false;
  const list = await userModel
    .find(matchFilter)
    .sort(sortObj)
    .collation({ locale: "en", caseLevel: true })
    .skip(skip)
    .limit(perPage);
  const total = await userModel.find(matchFilter).countDocuments();
  return { list, total };
}

async function update(userInfo, detail) {

  // await userModel.findOneAndUpdate(
  //   { _id : userInfo._id },
  //   { $set: detail }
  // )
  const { doc, changes } = await applyUpdate(userInfo, detail, TRACKING_FIELDS);
  await doc.save();
  return { _id: userInfo._id };
}

/**
 * This function is use for check email 
 * 
 * @param {String} userId - userId
 * @param {String} email - email
 * @returns {any} user
 */
async function checkEmailExist(email, userId) {
  var filter = {
      email: email,
  }
  if (userId != undefined) [
      filter._id = {
          $ne: userId
      },
  ]
  const user = await getDetail(filter)
  return user
}

/**
 * This function is use for delete user
 * 
 * @param {any} userId - userId
 * @returns {any} user
 */
async function deleteUser(userId) {
  const user = await userModel.findById(userId).exec();
  if(user){
    user.isDeleted = true;
    user.save();
  }

  return user;
}


/**
 * This function is use for delete user
 * 
 * @param {any} userId - userId
 * @returns {any} user
 */
async function deleteMany(userId, key) {
  let userIds = []
  if (typeof userId == 'string') {
      userIds = userId.split(",");
  } else {
      userIds = userId
  }
  const deleteUser = await userModel.updateMany(
      { [key]: { $in: userIds } },
      { $set: { isDeleted: true, image: null } },
      { multi: true }
  )

  if (deleteUser) {
      return userIds
  }
  return []
}

module.exports = {
  create: create,
  list: list,
  getDetail: getDetail,
  update: update,
  checkEmailExist:checkEmailExist,
  deleteUser:deleteUser,
  deleteMany:deleteMany
};
