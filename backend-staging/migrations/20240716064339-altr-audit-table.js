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
    await queryInterface.addColumn('audits', 'userProvinceId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'regions',
        key: 'id'
      },
      onDelete: 'SET NULL',
      after: 'addressLine2' // Specify the column name after which this column should be added
    });
    // Re-add the column with allowNull: true
    await queryInterface.addColumn('audits', 'propertyId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'property',
        key: 'id'
      },
      onDelete: 'CASCADE',
      after: 'id' // Specify the column name after which this column should be added
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('audits', 'userProvinceId');
    await queryInterface.removeColumn('audits', 'propertyId');
  }
};
