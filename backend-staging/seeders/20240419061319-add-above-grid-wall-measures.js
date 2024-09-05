'use strict';
const AboveGridWallMeasuresModel = require('../model/above_grid_wall_measures'); // Import your Sequelize model

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
      const fillData =
        [
          { rsi: 2.97, zone: "4", ecPoints: 2.0 },
          { rsi: 2.97, zone: "5", ecPoints: 0 },
          { rsi: 2.97, zone: "6", ecPoints: 0 },
          { rsi: 2.97, zone: "7A", ecPoints: 0 },
          { rsi: 2.97, zone: "7B", ecPoints: 0 },
          { rsi: 2.97, zone: "8", ecPoints: 0 },

          { rsi: 3.08, zone: "4", ecPoints: 3.1 },
          { rsi: 3.08, zone: "5", ecPoints: 1.4 },
          { rsi: 3.08, zone: "6", ecPoints: 1.6 },
          { rsi: 3.08, zone: "7A", ecPoints: 2.1 },
          { rsi: 3.08, zone: "7B", ecPoints: 0 },
          { rsi: 3.08, zone: "8", ecPoints: 0 },

          { rsi: 3.69, zone: "4", ecPoints: 7.4 },
          { rsi: 3.69, zone: "5", ecPoints: 5.4 },
          { rsi: 3.69, zone: "6", ecPoints: 6.2 },
          { rsi: 3.69, zone: "7A", ecPoints: 6.7 },
          { rsi: 3.69, zone: "7B", ecPoints: 5.4 },
          { rsi: 3.69, zone: "8", ecPoints: 5.2 },

          { rsi: 3.85, zone: "4", ecPoints: 8.2 },
          { rsi: 3.85, zone: "5", ecPoints: 6.0 },
          { rsi: 3.85, zone: "6", ecPoints: 6.9 },
          { rsi: 3.85, zone: "7A", ecPoints: 7.4 },
          { rsi: 3.85, zone: "7B", ecPoints: 6.2 },
          { rsi: 3.85, zone: "8", ecPoints: 6.0 },

          { rsi: 3.96, zone: "4", ecPoints: 8.9 },
          { rsi: 3.96, zone: "5", ecPoints: 6.8 },
          { rsi: 3.96, zone: "6", ecPoints: 7.7 },
          { rsi: 3.96, zone: "7A", ecPoints: 8.2 },
          { rsi: 3.96, zone: "7B", ecPoints: 7.0 },
          { rsi: 3.96, zone: "8", ecPoints: 6.8 },

          { rsi: 4.29, zone: "4", ecPoints: 10.2 },
          { rsi: 4.29, zone: "5", ecPoints: 8.1 },
          { rsi: 4.29, zone: "6", ecPoints: 9.2 },
          { rsi: 4.29, zone: "7A", ecPoints: 9.7 },
          { rsi: 4.29, zone: "7B", ecPoints: 8.6 },
          { rsi: 4.29, zone: "8", ecPoints: 8.4 },

          { rsi: 4.40, zone: "4", ecPoints: 10.8 },
          { rsi: 4.40, zone: "5", ecPoints: 8.7 },
          { rsi: 4.40, zone: "6", ecPoints: 9.9 },
          { rsi: 4.40, zone: "7A", ecPoints: 10.3 },
          { rsi: 4.40, zone: "7B", ecPoints: 9.3 },
          { rsi: 4.40, zone: "8", ecPoints: 9.1 },

          { rsi: 4.57, zone: "4", ecPoints: 11.4 },
          { rsi: 4.57, zone: "5", ecPoints: 9.3 },
          { rsi: 4.57, zone: "6", ecPoints: 10.6 },
          { rsi: 4.57, zone: "7A", ecPoints: 11.1 },
          { rsi: 4.57, zone: "7B", ecPoints: 10.1 },
          { rsi: 4.57, zone: "8", ecPoints: 9.9 },

          { rsi: 4.73, zone: "4", ecPoints: 11.9 },
          { rsi: 4.73, zone: "5", ecPoints: 9.7 },
          { rsi: 4.73, zone: "6", ecPoints: 11.1 },
          { rsi: 4.73, zone: "7A", ecPoints: 11.5 },
          { rsi: 4.73, zone: "7B", ecPoints: 10.6 },
          { rsi: 4.73, zone: "8", ecPoints: 10.4 },
        ];
      for (const data of fillData) {
        await AboveGridWallMeasuresModel.findOrCreate({
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
