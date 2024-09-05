'use strict';
const VentilationMeasuresModel = require('../model/ventilation_measures'); // Import your Sequelize model

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
        { SRE: "60% ≤ SRE < 65%", zone: '4', ecPoints: 0.7 },
        { SRE: "60% ≤ SRE < 65%", zone: '5', ecPoints: 0.7 },
        { SRE: "60% ≤ SRE < 65%", zone: '6', ecPoints: 0.7 },
        { SRE: "60% ≤ SRE < 65%", zone: '7A', ecPoints: 0.6 },
        { SRE: "60% ≤ SRE < 65%", zone: '7B', ecPoints: 0.8 },
        { SRE: "60% ≤ SRE < 65%", zone: '8', ecPoints: 0.4 },

        { SRE: "65% ≤ SRE < 75%", zone: '4', ecPoints: 2.1 },
        { SRE: "65% ≤ SRE < 75%", zone: '5', ecPoints: 2.1 },
        { SRE: "65% ≤ SRE < 75%", zone: '6', ecPoints: 2.2 },
        { SRE: "65% ≤ SRE < 75%", zone: '7A', ecPoints: 1.7 },
        { SRE: "65% ≤ SRE < 75%", zone: '7B', ecPoints: 2.3 },
        { SRE: "65% ≤ SRE < 75%", zone: '8', ecPoints: 1.2 },

        { SRE: "75% ≤ SRE < 84%", zone: '4', ecPoints: 3.4 },
        { SRE: "75% ≤ SRE < 84%", zone: '5', ecPoints: 3.2 },
        { SRE: "75% ≤ SRE < 84%", zone: '6', ecPoints: 3.5 },
        { SRE: "75% ≤ SRE < 84%", zone: '7A', ecPoints: 2.7 },
        { SRE: "75% ≤ SRE < 84%", zone: '7B', ecPoints: 3.7 },
        { SRE: "75% ≤ SRE < 84%", zone: '8', ecPoints: 1.8 },
      ];
      for (const data of fillData) {
        await VentilationMeasuresModel.findOrCreate({
          where: { SRE: data.SRE, zone: data.zone },
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
