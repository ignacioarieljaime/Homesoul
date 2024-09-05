'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.removeColumn('ecm_result_combinations', 'assemblyCategoryId');
	},

	down: async (queryInterface, Sequelize) => {
		
	}
};
