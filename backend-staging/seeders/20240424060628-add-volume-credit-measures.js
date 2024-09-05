'use strict';
const VolumeCreditMeasuresTModel = require('../model/volume_credit_measures'); // Import your Sequelize model

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
        { unit: 1, lBound: 13419.57, uBound: 13772.72, ecPoints: 1 },
        { unit: 1, lBound: 13066.43, uBound: 13419.57, ecPoints: 2 },
        { unit: 1, lBound: 12713.28, uBound: 13066.43, ecPoints: 3 },
        { unit: 1, lBound: 12360.13, uBound: 12713.28, ecPoints: 4 },
        { unit: 1, lBound: 12006.99, uBound: 12360.13, ecPoints: 5 },
        { unit: 1, lBound: 11653.84, uBound: 12006.99, ecPoints: 6 },
        { unit: 1, lBound: 11300.69, uBound: 11653.84, ecPoints: 7 },
        { unit: 1, lBound: 10947.55, uBound: 11300.69, ecPoints: 8 },
        { unit: 1, lBound: 10594.40, uBound: 10947.55, ecPoints: 9 },
        { unit: 1, lBound: 0.00, uBound: 10594.40, ecPoints: 10 },

        { unit: 2, lBound: 380.00, uBound: 390.00, ecPoints: 1 },
        { unit: 2, lBound: 370.00, uBound: 380.00, ecPoints: 2 },
        { unit: 2, lBound: 360.00, uBound: 370.00, ecPoints: 3 },
        { unit: 2, lBound: 350.00, uBound: 360.00, ecPoints: 4 },
        { unit: 2, lBound: 340.00, uBound: 350.00, ecPoints: 5 },
        { unit: 2, lBound: 330.00, uBound: 340.00, ecPoints: 6 },
        { unit: 2, lBound: 320.00, uBound: 330.00, ecPoints: 7 },
        { unit: 2, lBound: 310.00, uBound: 320.00, ecPoints: 8 },
        { unit: 2, lBound: 300.00, uBound: 310.00, ecPoints: 9 },
        { unit: 2, lBound: 0.00, uBound: 300.00, ecPoints: 10 },
      ];
      for (const data of fillData) {
        await VolumeCreditMeasuresTModel.findOrCreate({
          where: { unit: data.unit, lBound: data.lBound, uBound: data.uBound },
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
