'use strict';
const NBCTierModel = require('../model/nbc_tier'); // Import your Sequelize model
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
		const tiersData = [
		  { nbcTierTitle: 'Tier 1', ecPoints: 0 },
		  { nbcTierTitle: 'Tier 2', ecPoints: 10.0 },
		  { nbcTierTitle: 'Tier 3', ecPoints: 20.0 },
		  { nbcTierTitle: 'Tier 4', ecPoints: 0 },
		  { nbcTierTitle: 'Tier 5', ecPoints: 0 }
		];
  
		for (const tierData of tiersData) {
		  await NBCTierModel.findOrCreate({
			where: { nbcTierTitle: tierData.nbcTierTitle },
			defaults: { ecPoints: tierData.ecPoints }
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
