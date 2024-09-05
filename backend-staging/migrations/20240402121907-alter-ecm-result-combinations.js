'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {

      await queryInterface.addColumn('ecm_result_combinations', 'combinationId', {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'ecm_result_combinations_header', // Name of the target table
            key: 'id' // Name of the target column
          },
          onDelete: 'CASCADE', // Delete the row from the table if the referenced row is deleted
          after: 'id' // Specify the column name after which this column should be added

      });
	},

	down: async (queryInterface, Sequelize) => {
		 
		 await queryInterface.removeColumn('ecm_result_combinations', 'combinationId');
	}
};
