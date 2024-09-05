'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {

      // Drop the existing column
		  await queryInterface.removeColumn('audits', 'pincode');

      await queryInterface.addColumn('audits', 'pincode1', {
        type: Sequelize.STRING(20),
        allowNull: true,
        after: 'phone' // Specify the column name after which this column should be added

      });
      await queryInterface.addColumn('audits', 'pincode2', {
        type: Sequelize.STRING(20),
        allowNull: true,
        after: 'pincode1' // Specify the column name after which this column should be added

      });
	},

	down: async (queryInterface, Sequelize) => {
		 
		 await queryInterface.removeColumn('audits', 'pincode1');
     await queryInterface.removeColumn('audits', 'pincode2');

     
		 await queryInterface.addColumn('audits', 'pincode', {
        type: Sequelize.STRING(20),
        allowNull: true,
        after: 'emailId'
    });
	}
};
