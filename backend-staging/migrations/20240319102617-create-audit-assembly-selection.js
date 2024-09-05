'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		/**
		 * Add altering commands here.
		 *
		 * Example:
		 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
		 */
		await queryInterface.createTable('audit_assembly_selection', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			auditId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'audits', // Name of the target table
					key: 'id' // Name of the target column
				},
				onDelete: 'CASCADE' // Delete the row from the table if the referenced row is deleted
			},
			assemblyCategoryId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'assembly_category', // Name of the target table
					key: 'id' // Name of the target column
				},
				onDelete: 'CASCADE' // Delete the row from the table if the referenced row is deleted
			},
			assemblyId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'assembly', // Name of the target table
					key: 'id' // Name of the target column
				},
				onDelete: 'CASCADE' // Delete the row from the table if the referenced row is deleted
			},
			cost: {
				type: Sequelize.DECIMAL(10, 2), // 10 digits in total, 2 after the decimal point
				allowNull: true,
				defaultValue: 0,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
			},
			isDeleted: {
				type: Sequelize.TINYINT,
				allowNull: true,
				defaultValue: 0
			},
		});
  	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('audit_assembly_selection');
	}
};
