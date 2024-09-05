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
    await queryInterface.addColumn('auditor_pincode', 'provinceId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'regions',
        key: 'id'
      },
      onDelete: 'CASCADE',
      after: 'pincode' // Specify the column name after which this column should be added
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('auditor_pincode', 'provinceId');
  }
};
