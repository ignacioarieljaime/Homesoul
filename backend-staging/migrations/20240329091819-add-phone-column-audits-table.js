'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
      await queryInterface.addColumn('audits', 'phone', {
        type: Sequelize.STRING(20),
        allowNull: true,
        after: 'pincode' // Specify the column name after which this column should be added

      });
	},

	down: async (queryInterface, Sequelize) => {
		 // Drop the column added in the up function
		 await queryInterface.removeColumn('audits', 'phone');
	}
};
