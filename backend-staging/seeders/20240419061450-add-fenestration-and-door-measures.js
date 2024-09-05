'use strict';
const FenestrationAndDoorMeasuresModel = require('../model/fenestration_and_door_measures'); // Import your Sequelize model

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
        { max_uValue: 1.61, min_energy_rating: 25, zone: '4', ecPoints: 1.9 },
        { max_uValue: 1.61, min_energy_rating: 25, zone: '5', ecPoints: 1.8 },
        { max_uValue: 1.61, min_energy_rating: 25, zone: '6', ecPoints: 0 },
        { max_uValue: 1.61, min_energy_rating: 25, zone: '7A', ecPoints: 0 },
        { max_uValue: 1.61, min_energy_rating: 25, zone: '7B', ecPoints: 0 },
        { max_uValue: 1.61, min_energy_rating: 25, zone: '8', ecPoints: 0 },

        { max_uValue: 1.44, min_energy_rating: 29, zone: '4', ecPoints: 3.8 },
        { max_uValue: 1.44, min_energy_rating: 29, zone: '5', ecPoints: 3.6 },
        { max_uValue: 1.44, min_energy_rating: 29, zone: '6', ecPoints: 1.6 },
        { max_uValue: 1.44, min_energy_rating: 29, zone: '7A', ecPoints: 1.8 },
        { max_uValue: 1.44, min_energy_rating: 29, zone: '7B', ecPoints: 0 },
        { max_uValue: 1.44, min_energy_rating: 29, zone: '8', ecPoints: 0 },

        { max_uValue: 1.22, min_energy_rating: 34, zone: '4', ecPoints: 6.9 },
        { max_uValue: 1.22, min_energy_rating: 34, zone: '5', ecPoints: 7.0 },
        { max_uValue: 1.22, min_energy_rating: 34, zone: '6', ecPoints: 4.6 },
        { max_uValue: 1.22, min_energy_rating: 34, zone: '7A', ecPoints: 5.5 },
        { max_uValue: 1.22, min_energy_rating: 34, zone: '7B', ecPoints: 3.2 },
        { max_uValue: 1.22, min_energy_rating: 34, zone: '8', ecPoints: 3.4 },

        { max_uValue: 1.05, min_energy_rating: 40, zone: '4', ecPoints: 0 },
        { max_uValue: 1.05, min_energy_rating: 40, zone: '5', ecPoints: 0 },
        { max_uValue: 1.05, min_energy_rating: 40, zone: '6', ecPoints: 0 },
        { max_uValue: 1.05, min_energy_rating: 40, zone: '7A', ecPoints: 0 },
        { max_uValue: 1.05, min_energy_rating: 40, zone: '7B', ecPoints: 0 },
        { max_uValue: 1.05, min_energy_rating: 40, zone: '8', ecPoints: 0 },

        { max_uValue: 0.94, min_energy_rating: 42, zone: '4', ecPoints: 0 },
        { max_uValue: 0.94, min_energy_rating: 42, zone: '5', ecPoints: 0 },
        { max_uValue: 0.94, min_energy_rating: 42, zone: '6', ecPoints: 0 },
        { max_uValue: 0.94, min_energy_rating: 42, zone: '7A', ecPoints: 0 },
        { max_uValue: 0.94, min_energy_rating: 42, zone: '7B', ecPoints: 0 },
        { max_uValue: 0.94, min_energy_rating: 42, zone: '8', ecPoints: 0 },

        { max_uValue: 0.82, min_energy_rating: 44, zone: '4', ecPoints: 0 },
        { max_uValue: 0.82, min_energy_rating: 44, zone: '5', ecPoints: 0 },
        { max_uValue: 0.82, min_energy_rating: 44, zone: '6', ecPoints: 0 },
        { max_uValue: 0.82, min_energy_rating: 44, zone: '7A', ecPoints: 0 },
        { max_uValue: 0.82, min_energy_rating: 44, zone: '7B', ecPoints: 0 },
        { max_uValue: 0.82, min_energy_rating: 44, zone: '8', ecPoints: 0 },
      ];
      for (const data of fillData) {
        await FenestrationAndDoorMeasuresModel.findOrCreate({
          where: { max_uValue: data.max_uValue, min_energy_rating: data.min_energy_rating, zone: data.zone },
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
