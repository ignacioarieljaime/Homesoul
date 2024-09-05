'use strict';
const AirTightnessMeasuresTModel = require('../model/air_tightness_measures'); // Import your Sequelize model

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
        { homeType: 2, level: "AL-1A", zone: '4', ecPoints: 0 },
        { homeType: 2, level: "AL-1A", zone: '5', ecPoints: 0 },
        { homeType: 2, level: "AL-1A", zone: '6', ecPoints: 0 },
        { homeType: 2, level: "AL-1A", zone: '7A', ecPoints: 0 },
        { homeType: 2, level: "AL-1A", zone: '7B', ecPoints: 0 },
        { homeType: 2, level: "AL-1A", zone: '8', ecPoints: 0 },

        { homeType: 2, level: "AL-2A", zone: '4', ecPoints: 2.2 },
        { homeType: 2, level: "AL-2A", zone: '5', ecPoints: 3.2 },
        { homeType: 2, level: "AL-2A", zone: '6', ecPoints: 3.5 },
        { homeType: 2, level: "AL-2A", zone: '7A', ecPoints: 3.8 },
        { homeType: 2, level: "AL-2A", zone: '7B', ecPoints: 4.3 },
        { homeType: 2, level: "AL-2A", zone: '8', ecPoints: 4.8 },

        { homeType: 2, level: "AL-3A", zone: '4', ecPoints: 4.3 },
        { homeType: 2, level: "AL-3A", zone: '5', ecPoints: 6.3 },
        { homeType: 2, level: "AL-3A", zone: '6', ecPoints: 6.9 },
        { homeType: 2, level: "AL-3A", zone: '7A', ecPoints: 7.6 },
        { homeType: 2, level: "AL-3A", zone: '7B', ecPoints: 8.5 },
        { homeType: 2, level: "AL-3A", zone: '8', ecPoints: 9.7 },

        { homeType: 2, level: "AL-4A", zone: '4', ecPoints: 6.5 },
        { homeType: 2, level: "AL-4A", zone: '5', ecPoints: 9.6 },
        { homeType: 2, level: "AL-4A", zone: '6', ecPoints: 10.5 },
        { homeType: 2, level: "AL-4A", zone: '7A', ecPoints: 11.4 },
        { homeType: 2, level: "AL-4A", zone: '7B', ecPoints: 12.9 },
        { homeType: 2, level: "AL-4A", zone: '8', ecPoints: 14.7 },

        { homeType: 2, level: "AL-5A", zone: '4', ecPoints: 8.3 },
        { homeType: 2, level: "AL-5A", zone: '5', ecPoints: 12.3 },
        { homeType: 2, level: "AL-5A", zone: '6', ecPoints: 13.4 },
        { homeType: 2, level: "AL-5A", zone: '7A', ecPoints: 14.7 },
        { homeType: 2, level: "AL-5A", zone: '7B', ecPoints: 16.5 },
        { homeType: 2, level: "AL-5A", zone: '8', ecPoints: 18.8 },

        { homeType: 1, level: "AL-1B", zone: '4', ecPoints: 0 },
        { homeType: 1, level: "AL-1B", zone: '5', ecPoints: 0 },
        { homeType: 1, level: "AL-1B", zone: '6', ecPoints: 0 },
        { homeType: 1, level: "AL-1B", zone: '7A', ecPoints: 0 },
        { homeType: 1, level: "AL-1B", zone: '7B', ecPoints: 0 },
        { homeType: 1, level: "AL-1B", zone: '8', ecPoints: 0 },

        { homeType: 1, level: "AL-2B", zone: '4', ecPoints: 2.1 },
        { homeType: 1, level: "AL-2B", zone: '5', ecPoints: 3.2 },
        { homeType: 1, level: "AL-2B", zone: '6', ecPoints: 3.5 },
        { homeType: 1, level: "AL-2B", zone: '7A', ecPoints: 3.8 },
        { homeType: 1, level: "AL-2B", zone: '7B', ecPoints: 4.3 },
        { homeType: 1, level: "AL-2B", zone: '8', ecPoints: 4.8 },

        { homeType: 1, level: "AL-3B", zone: '4', ecPoints: 4.3 },
        { homeType: 1, level: "AL-3B", zone: '5', ecPoints: 6.4 },
        { homeType: 1, level: "AL-3B", zone: '6', ecPoints: 6.9 },
        { homeType: 1, level: "AL-3B", zone: '7A', ecPoints: 7.6 },
        { homeType: 1, level: "AL-3B", zone: '7B', ecPoints: 8.5 },
        { homeType: 1, level: "AL-3B", zone: '8', ecPoints: 9.6 },

        { homeType: 1, level: "AL-4B", zone: '4', ecPoints: 6.4 },
        { homeType: 1, level: "AL-4B", zone: '5', ecPoints: 9.6 },
        { homeType: 1, level: "AL-4B", zone: '6', ecPoints: 10.4 },
        { homeType: 1, level: "AL-4B", zone: '7A', ecPoints: 11.5 },
        { homeType: 1, level: "AL-4B", zone: '7B', ecPoints: 12.8 },
        { homeType: 1, level: "AL-4B", zone: '8', ecPoints: 14.5 },

        { homeType: 1, level: "AL-5B", zone: '4', ecPoints: 8.6 },
        { homeType: 1, level: "AL-5B", zone: '5', ecPoints: 12.8 },
        { homeType: 1, level: "AL-5B", zone: '6', ecPoints: 14.0 },
        { homeType: 1, level: "AL-5B", zone: '7A', ecPoints: 15.4 },
        { homeType: 1, level: "AL-5B", zone: '7B', ecPoints: 17.2 },
        { homeType: 1, level: "AL-5B", zone: '8', ecPoints: 19.6 },

        { homeType: 1, level: "AL-6B", zone: '4', ecPoints: 10.4 },
        { homeType: 1, level: "AL-6B", zone: '5', ecPoints: 15.6 },
        { homeType: 1, level: "AL-6B", zone: '6', ecPoints: 17.0 },
        { homeType: 1, level: "AL-6B", zone: '7A', ecPoints: 18.7 },
        { homeType: 1, level: "AL-6B", zone: '7B', ecPoints: 20.9 },
        { homeType: 1, level: "AL-6B", zone: '8', ecPoints: 23.8 },
      ];
      for (const data of fillData) {
        await AirTightnessMeasuresTModel.findOrCreate({
          where: { homeType: data.homeType, level: data.level, zone: data.zone },
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
