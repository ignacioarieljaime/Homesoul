'use strict';
const RegionsModel = require('../model/regions'); // Import your Sequelize model
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
		const regionData = [
		  	{ regionCode: 'AB', regionTitle: 'Alberta' },
			{ regionCode: 'BC', regionTitle: 'British Columbia' },
			{ regionCode: 'MB', regionTitle: 'Manitoba' },
			{ regionCode: 'NB', regionTitle: 'New Brunswick' },
			{ regionCode: 'NL', regionTitle: 'Newfoundland and Labrador' },
			{ regionCode: 'NT', regionTitle: 'Northwest Territories' },
			{ regionCode: 'NS', regionTitle: 'Nova Scotia' },
			{ regionCode: 'NU', regionTitle: 'Nunavut' },
			{ regionCode: 'ON', regionTitle: 'Ontario' },
			{ regionCode: 'PE', regionTitle: 'Prince Edward Island' },
			{ regionCode: 'QC', regionTitle: 'Quebec' },
			{ regionCode: 'SK', regionTitle: 'Saskatchewan' },
			{ regionCode: 'YT', regionTitle: 'Yukon' },
		  
		];
  
		for (const tierData of regionData) {
			await RegionsModel.findOrCreate({
				where: { regionCode: tierData.regionCode },
				defaults: { regionTitle: tierData.regionTitle }
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
