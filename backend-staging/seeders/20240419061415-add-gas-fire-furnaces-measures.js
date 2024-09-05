'use strict';
const GasFireFurnaceMeasuresModel = require('../model/gas_fire_furnaces_measures'); // Import your Sequelize model

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
        { AFUE: "96% AFUE", zone: '4', ecPoints: 0.4 },
        { AFUE: "96% AFUE", zone: '5', ecPoints: 0.4 },
        { AFUE: "96% AFUE", zone: '6', ecPoints: 0.4 },
        { AFUE: "96% AFUE", zone: '7A', ecPoints: 0.5 },
        { AFUE: "96% AFUE", zone: '7B', ecPoints: 0.5 },
        { AFUE: "96% AFUE", zone: '8', ecPoints: 0.5 },

        { AFUE: "98% AFUE", zone: '4', ecPoints: 1.1 },
        { AFUE: "98% AFUE", zone: '5', ecPoints: 1.3 },
        { AFUE: "98% AFUE", zone: '6', ecPoints: 1.3 },
        { AFUE: "98% AFUE", zone: '7A', ecPoints: 1.5 },
        { AFUE: "98% AFUE", zone: '7B', ecPoints: 1.5 },
        { AFUE: "98% AFUE", zone: '8', ecPoints: 1.6 },
      ];
      for (const data of fillData) {
        await GasFireFurnaceMeasuresModel.findOrCreate({
          where: { AFUE: data.AFUE, zone: data.zone },
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
