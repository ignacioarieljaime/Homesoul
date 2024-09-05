'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {

		// Drop the existing column
		await queryInterface.addColumn('ecm_result_combinations', 'totalCombinationECP', {
			type: Sequelize.DECIMAL(10, 2), // 10 digits in total, 2 after the decimal point
			allowNull: true,
			defaultValue: 0,
			after: 'assemblyIds'
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.removeColumn('ecm_result_combinations', 'totalCombinationECP');
	}
};
