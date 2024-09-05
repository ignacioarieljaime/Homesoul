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
    await queryInterface.addColumn('user_master', 'provinceId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'regions',
        key: 'id'
      },
      onDelete: 'SET NULL',
      after: 'pincode' // Specify the column name after which this column should be added
    });
    await queryInterface.addColumn('user_master', 'energy_audit', {
      type: Sequelize.TINYINT,
      allowNull: true,
      defaultValue: 0,
      after: 'isPhoneVerified' // Specify the column name after which this column should be added
    });
    await queryInterface.addColumn('user_master', 'consultation', {
      type: Sequelize.TINYINT,
      allowNull: true,
      defaultValue: 0,
      after: 'energy_audit' // Specify the column name after which this column should be added
    });
    await queryInterface.addColumn('user_master', 'seeking_investment', {
      type: Sequelize.TINYINT,
      allowNull: true,
      defaultValue: 0,
      after: 'consultation' // Specify the column name after which this column should be added
    });
    await queryInterface.addColumn('user_master', 'is_offline', {
      type: Sequelize.TINYINT,
      allowNull: true,
      defaultValue: 0,
      after: 'seeking_investment' // Specify the column name after which this column should be added
    });
    await queryInterface.changeColumn('user_master', 'password', {
      type: Sequelize.STRING(255), // Adjust the type if necessary
      allowNull: true, // Allow null values
      defaultValue: null // Set default value to null
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('audits', 'provinceId');
    await queryInterface.removeColumn('audits', 'energy_audit');
    await queryInterface.removeColumn('audits', 'consultation');
    await queryInterface.removeColumn('audits', 'seeking_investment');
    await queryInterface.removeColumn('audits', 'is_offline');
    await queryInterface.changeColumn('user_master', 'password', {
      type: Sequelize.STRING(255), // Adjust the type if necessary
      allowNull: false, // Restore original allowNull value
      defaultValue: '' // Set original default value if known
    });
  }
};
