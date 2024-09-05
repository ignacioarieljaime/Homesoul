'use strict';
const AssemblyCategory = require('../model/assembly_category'); // Import your Sequelize model
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
		const fillData = [
		  	{ title: 'Above Grade Walls'},
			{ title: 'Below Grade Walls'},
			{ title: 'Fenestration and Doors'},
			{ title: 'Air Tightness'},
			{ title: 'Ventilation'},
			{ title: 'Water Heating Equipment'},
			{ title: 'Gas-Fired Furnaces'},
			{ title: 'Drain Water Heat Recovery	'}
		];
  
		for (const data of fillData) {
			await AssemblyCategory.findOrCreate({
				where: { title: data.title },
				defaults: { title: data.title}
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
