'use strict';
const AdminModel = require('../model/admin'); // Import your Sequelize model
const bcrypt = require("bcrypt");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    try {
      const adminsData = [
        { emailID: 'admin@admin.com', password:  await bcrypt.hash('admin@123', 10) },
      ];
    
      for (const adminData of adminsData) {
        await AdminModel.findOrCreate({
        where: { emailID: adminData.emailID },
        defaults: { password: adminData.password }
        });
      }
      } catch (error) {
      console.error('Error seeding data:', error);
      }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
