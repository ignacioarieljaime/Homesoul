const userRepo = require("../data-access/user");

/**
 * Returns user by id.
 *
 * @param {string} userId - user id
 * @returns {any} user
 */
async function getUserById(userId) {
    const user = await userRepo.getDetail({ id: userId, isDeleted: false })
    return user
}

module.exports = {
    getUserById: getUserById,
}