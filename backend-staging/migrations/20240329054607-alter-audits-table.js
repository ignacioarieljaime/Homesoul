'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {

		// Drop the existing column
		await queryInterface.removeColumn('audits', 'auditRequestId');

		// Re-add the column with allowNull: true
		await queryInterface.addColumn('audits', 'auditRequestId', {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
			  model: 'user_audit_requests',
			  key: 'id'
			},
			onDelete: 'CASCADE',
			after: 'auditorId' // Specify the column name after which this column should be added

		});
	},

	down: async (queryInterface, Sequelize) => {
		 // Drop the column added in the up function
		 await queryInterface.removeColumn('audits', 'auditRequestId');
    
		 // Re-add the column with allowNull: false
		 await queryInterface.addColumn('audits', 'auditRequestId', {
		   type: Sequelize.INTEGER,
		   allowNull: false,
		   references: {
			 model: 'user_audit_requests',
			 key: 'id'
		   },
		   onDelete: 'CASCADE'
		 });
	}
};
