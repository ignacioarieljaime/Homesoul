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
      await queryInterface.createTable('user_home', {
		id: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		userId: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
			  model: 'user_master', // Name of the target table
			  key: 'id' // Name of the target column
			},
			onDelete: 'CASCADE' // Delete the row from the table if the referenced row is deleted
		},
		pincode: {
			type: Sequelize.STRING(20),
			allowNull: true
		},
		addressLine1: {
			type: Sequelize.STRING(500),
			allowNull: true
		},
		addressLine2: {
			type: Sequelize.STRING(500),
			allowNull: true
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
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
	await queryInterface.dropTable('user_home');

  }
};
