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
		await queryInterface.createTable('assembly_elements', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
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
			elementTitle: {
				type: Sequelize.STRING(100),
				allowNull: true,
			},
			elementDetails: {
                type: Sequelize.STRING(500),
                allowNull: true
            },
			table: {
                type: Sequelize.STRING(50),
                allowNull: true
            },
            effectiveRSI: {
				type: Sequelize.DECIMAL(5, 2), // 10 digits in total, 2 after the decimal point
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
		await queryInterface.dropTable('assembly_elements');
	}
};
