'use strict';
const DrainWaterMeasuresModel = require('../model/drain_water_measures'); // Import your Sequelize model

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
        { HRE: "30% Efficiency", zone: '4', ecPoints: 2.4 },
        { HRE: "30% Efficiency", zone: '5', ecPoints: 1.9 },
        { HRE: "30% Efficiency", zone: '6', ecPoints: 1.9 },
        { HRE: "30% Efficiency", zone: '7A', ecPoints: 1.9 },
        { HRE: "30% Efficiency", zone: '7B', ecPoints: 1.9 },
        { HRE: "30% Efficiency", zone: '8', ecPoints: 1.5 },

        { HRE: "40% Efficiency", zone: '4', ecPoints: 3.1 },
        { HRE: "40% Efficiency", zone: '5', ecPoints: 2.4 },
        { HRE: "40% Efficiency", zone: '6', ecPoints: 2.4 },
        { HRE: "40% Efficiency", zone: '7A', ecPoints: 2.4 },
        { HRE: "40% Efficiency", zone: '7B', ecPoints: 2.4 },
        { HRE: "40% Efficiency", zone: '8', ecPoints: 2.0 },

        { HRE: "50% Efficiency", zone: '4', ecPoints: 3.7 },
        { HRE: "50% Efficiency", zone: '5', ecPoints: 2.9 },
        { HRE: "50% Efficiency", zone: '6', ecPoints: 3.0 },
        { HRE: "50% Efficiency", zone: '7A', ecPoints: 2.9 },
        { HRE: "50% Efficiency", zone: '7B', ecPoints: 2.9 },
        { HRE: "50% Efficiency", zone: '8', ecPoints: 2.4 },

        { HRE: "60% Efficiency", zone: '4', ecPoints: 4.4 },
        { HRE: "60% Efficiency", zone: '5', ecPoints: 3.4 },
        { HRE: "60% Efficiency", zone: '6', ecPoints: 3.5 },
        { HRE: "60% Efficiency", zone: '7A', ecPoints: 3.5 },
        { HRE: "60% Efficiency", zone: '7B', ecPoints: 3.4 },
        { HRE: "60% Efficiency", zone: '8', ecPoints: 2.8 },

        { HRE: "70% Efficiency", zone: '4', ecPoints: 5.0 },
        { HRE: "70% Efficiency", zone: '5', ecPoints: 3.9 },
        { HRE: "70% Efficiency", zone: '6', ecPoints: 4.0 },
        { HRE: "70% Efficiency", zone: '7A', ecPoints: 4.0 },
        { HRE: "70% Efficiency", zone: '7B', ecPoints: 3.9 },
        { HRE: "70% Efficiency", zone: '8', ecPoints: 3.2 },

        { HRE: "75% Efficiency", zone: '4', ecPoints: 5.4 },
        { HRE: "75% Efficiency", zone: '5', ecPoints: 4.1 },
        { HRE: "75% Efficiency", zone: '6', ecPoints: 4.3 },
        { HRE: "75% Efficiency", zone: '7A', ecPoints: 4.2 },
        { HRE: "75% Efficiency", zone: '7B', ecPoints: 4.2 },
        { HRE: "75% Efficiency", zone: '8', ecPoints: 3.4 },
      ];
      for (const data of fillData) {
        await DrainWaterMeasuresModel.findOrCreate({
          where: { HRE: data.HRE, zone: data.zone },
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
