'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {

      await queryInterface.removeColumn('user_audit_requests', 'homeId');

      await queryInterface.addColumn('user_audit_requests', 'homeId', {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'user_home', // Name of the target table
            key: 'id' // Name of the target column
          },
          onDelete: 'CASCADE', // Delete the row from the table if the referenced row is deleted
          after: 'userId' // Specify the column name after which this column should be added

      });
	},

	down: async (queryInterface, Sequelize) => {
		 
	}
};
