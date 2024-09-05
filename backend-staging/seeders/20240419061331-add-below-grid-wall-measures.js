'use strict';
const BelowGridWallMeasuresModel = require('../model/below_grid_wall_measures'); // Import your Sequelize model

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
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
      const fillData = [
        { rsi: 2.98, zone: '4', ecPoints: 1.7 },
        { rsi: 2.98, zone: '5', ecPoints: 0 },
        { rsi: 2.98, zone: '6', ecPoints: 0 },
        { rsi: 2.98, zone: '7A', ecPoints: 0 },
        { rsi: 2.98, zone: '7B', ecPoints: 0 },
        { rsi: 2.98, zone: '8', ecPoints: 0 },

        { rsi: 3.09, zone: '4', ecPoints: 1.8 },
        { rsi: 3.09, zone: '5', ecPoints: 0.2 },
        { rsi: 3.09, zone: '6', ecPoints: 0.2 },
        { rsi: 3.09, zone: '7A', ecPoints: 0.2 },
        { rsi: 3.09, zone: '7B', ecPoints: 0.2 },
        { rsi: 3.09, zone: '8', ecPoints: 0 },

        { rsi: 3.46, zone: '4', ecPoints: 2.2 },
        { rsi: 3.46, zone: '5', ecPoints: 0.6 },
        { rsi: 3.46, zone: '6', ecPoints: 0.8 },
        { rsi: 3.46, zone: '7A', ecPoints: 0.6 },
        { rsi: 3.46, zone: '7B', ecPoints: 0.7 },
        { rsi: 3.46, zone: '8', ecPoints: 0 },

        { rsi: 3.90, zone: '4', ecPoints: 2.6 },
        { rsi: 3.90, zone: '5', ecPoints: 1.2 },
        { rsi: 3.90, zone: '6', ecPoints: 1.4 },
        { rsi: 3.90, zone: '7A', ecPoints: 1.4 },
        { rsi: 3.90, zone: '7B', ecPoints: 1.3 },
        { rsi: 3.90, zone: '8', ecPoints: 0 },
      ];
      for (const data of fillData) {
        await BelowGridWallMeasuresModel.findOrCreate({
          where: { rsi: data.rsi, zone: data.zone },
          defaults: { ecPoints: data.ecPoints }
        });
      }
    } catch (error) {
      console.error('Error seeding data:', error);
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
