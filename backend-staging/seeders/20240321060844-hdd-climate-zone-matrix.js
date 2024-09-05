'use strict';
const HDDClimateZoneMatrix = require('../model/hdd_climate_zone_matrix'); // Import your Sequelize model
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
		const climateData = [
		  	{ minHdd: 0, maxHdd: 2999, zone: '4' },
			{ minHdd: 3000, maxHdd: 3999, zone: '5' },
			{ minHdd: 4000, maxHdd: 4999, zone: '6' },
			{ minHdd: 5000, maxHdd: 5999, zone: '7A' },
			{ minHdd: 6000, maxHdd: 6999, zone: '7B' },
			{ minHdd: 7000, maxHdd: 1000000000, zone: '8' }
		];
  
		for (const data of climateData) {
			await HDDClimateZoneMatrix.findOrCreate({
				where: { minHdd: data.minHdd },
				defaults: { maxHdd: data.maxHdd, zone: data.zone }
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
