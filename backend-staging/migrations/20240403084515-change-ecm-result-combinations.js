'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.removeColumn('ecm_result_combinations', 'assemblyId');

		await queryInterface.addColumn('ecm_result_combinations', 'assemblyIds', {
			type: Sequelize.STRING(255),
			allowNull: true,
			after: 'assemblyCategoryId' // Specify the column name after which this column should be added
	
		});
	},

	down: async (queryInterface, Sequelize) => {
		
	}
};
