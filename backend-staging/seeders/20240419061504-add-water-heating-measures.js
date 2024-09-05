'use strict';
const WaterHeatingEquipmentMeasuresModel = require('../model/water_heating_measures'); // Import your Sequelize model

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
          { UEF: "EF ≥ 0.95 or UEF ≥ 0.92", zone: "4", ecPoints: 8.9 },
          { UEF: "EF ≥ 0.95 or UEF ≥ 0.92", zone: "5", ecPoints: 5.4 },
          { UEF: "EF ≥ 0.95 or UEF ≥ 0.92", zone: "6", ecPoints: 4.9 },
          { UEF: "EF ≥ 0.95 or UEF ≥ 0.92", zone: "7A", ecPoints: 3.1 },
          { UEF: "EF ≥ 0.95 or UEF ≥ 0.92", zone: "7B", ecPoints: 3.1 },
          { UEF: "EF ≥ 0.95 or UEF ≥ 0.92", zone: "8", ecPoints: 3.1 },

          { UEF: "EF ≥ 0.80 or UEF ≥ 0.83", zone: "4", ecPoints: 8.9 },
          { UEF: "EF ≥ 0.80 or UEF ≥ 0.83", zone: "5", ecPoints: 5.4 },
          { UEF: "EF ≥ 0.80 or UEF ≥ 0.83", zone: "6", ecPoints: 4.9 },
          { UEF: "EF ≥ 0.80 or UEF ≥ 0.83", zone: "7A", ecPoints: 3.1 },
          { UEF: "EF ≥ 0.80 or UEF ≥ 0.83", zone: "7B", ecPoints: 3.1 },
          { UEF: "EF ≥ 0.80 or UEF ≥ 0.83", zone: "8", ecPoints: 3.1 },

          { UEF: "UEF ≥ 0.79", zone: "4", ecPoints: 4.6 },
          { UEF: "UEF ≥ 0.79", zone: "5", ecPoints: 2.7 },
          { UEF: "UEF ≥ 0.79", zone: "6", ecPoints: 2.4 },
          { UEF: "UEF ≥ 0.79", zone: "7A", ecPoints: 1.5 },
          { UEF: "UEF ≥ 0.79", zone: "7B", ecPoints: 1.5 },
          { UEF: "UEF ≥ 0.79", zone: "8", ecPoints: 1.5 },

          { UEF: "UEF ≥ 0.85", zone: "4", ecPoints: 6.0 },
          { UEF: "UEF ≥ 0.85", zone: "5", ecPoints: 3.6 },
          { UEF: "UEF ≥ 0.85", zone: "6", ecPoints: 3.2 },
          { UEF: "UEF ≥ 0.85", zone: "7A", ecPoints: 2.0 },
          { UEF: "UEF ≥ 0.85", zone: "7B", ecPoints: 2.0 },
          { UEF: "UEF ≥ 0.85", zone: "8", ecPoints: 2.0 },

          { UEF: "EF ≥ 2.35", zone: "4", ecPoints: 6.4 },
          { UEF: "EF ≥ 2.35", zone: "5", ecPoints: 3.9 },
          { UEF: "EF ≥ 2.35", zone: "6", ecPoints: 3.8 },
          { UEF: "EF ≥ 2.35", zone: "7A", ecPoints: 3.0 },
          { UEF: "EF ≥ 2.35", zone: "7B", ecPoints: 3.0 },
          { UEF: "EF ≥ 2.35", zone: "8", ecPoints: 3.0 },
        ];
      for (const data of fillData) {
        await WaterHeatingEquipmentMeasuresModel.findOrCreate({
          where: { UEF: data.UEF, zone: data.zone },
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
