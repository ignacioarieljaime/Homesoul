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
		await queryInterface.createTable('regions', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			regionCode: {
				type: Sequelize.STRING(10),
				allowNull: true,
			},
			regionTitle: {
				type: Sequelize.STRING(100),
				allowNull: true,
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
		await queryInterface.dropTable('regions');
	}
};
