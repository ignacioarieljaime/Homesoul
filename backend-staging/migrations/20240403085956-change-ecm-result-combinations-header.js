'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {

		// Drop the existing column
		await queryInterface.removeColumn('ecm_result_combinations_header', 'totalECPoints');

		await queryInterface.addColumn('ecm_result_combinations_header', 'totalECPoints', {
			type: Sequelize.DECIMAL(10, 2), // 10 digits in total, 2 after the decimal point
			allowNull: true,
			defaultValue: 0,
			after: 'auditId'
		});
	},

	down: async (queryInterface, Sequelize) => {
		 
		await queryInterface.removeColumn('ecm_result_combinations_header', 'totalECPoints');
     
		await queryInterface.addColumn('ecm_result_combinations_header', 'totalECPoints', {
			type: Sequelize.DECIMAL(5, 2), // 5 digits in total, 2 after the decimal point
			allowNull: true,
			defaultValue: 0,
			after: 'auditId'
		});
	}
};
