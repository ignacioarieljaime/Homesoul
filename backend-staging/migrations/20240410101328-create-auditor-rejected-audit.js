'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('auditor_rejected_audit', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      auditorId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'auditor', // Name of the target table
          key: 'id' // Name of the target column
        },
        onDelete: 'CASCADE' // Delete the row from the table if the referenced row is deleted
      },
	  auditId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'audits', // Name of the target table
          key: 'id' // Name of the target column
        },
        onDelete: 'CASCADE' // Delete the row from the table if the referenced row is deleted
      },
      rejectReason: {
		type: Sequelize.STRING(250),
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

  async down(queryInterface, Sequelize) {
	await queryInterface.dropTable('auditor_rejected_audit');
  }
};
