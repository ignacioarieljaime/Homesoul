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
      await queryInterface.createTable('user_master', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        userType: {
          type: Sequelize.INTEGER,
          allowNull: true
        },
        firstName: {
          type: Sequelize.STRING(30),
          allowNull: true
        },
        lastName: {
          type: Sequelize.STRING(30),
          allowNull: true
        },
        emailID: {
          type: Sequelize.STRING(320),
          allowNull: true
        },
        password: {
          type: Sequelize.STRING(30),
          allowNull: true
        },
        phoneNo: {
          type: Sequelize.STRING(15),
          allowNull: true
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
        forgotPasswordCode: {
          type: Sequelize.STRING(100),
          allowNull: true
        },
        emailVerificationCode: {
          type: Sequelize.STRING(100),
          allowNull: true
        },
        isEmailVerified: {
          type: Sequelize.TINYINT,
          allowNull: true,
          defaultValue: 0,
        },
        isPhoneVerified: {
          type: Sequelize.TINYINT,
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
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
	await queryInterface.dropTable('user_master');

  }
};
