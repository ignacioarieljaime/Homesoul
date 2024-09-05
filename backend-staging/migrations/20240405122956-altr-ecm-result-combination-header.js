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
    await queryInterface.changeColumn('ecm_result_combinations_header', 'totalECMCost', {
      type: Sequelize.DECIMAL(20, 2), // Adjust the precision and scale as needed
      allowNull: true, // Or true if it's nullable
			defaultValue: 0,
    });
    await queryInterface.changeColumn('ecm_result_combinations_header', 'totalECPoints', {
      type: Sequelize.DECIMAL(20, 2), // Adjust the precision and scale as needed
      allowNull: true, // Or true if it's nullable
			defaultValue: 0,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.changeColumn('ecm_result_combinations_header', 'totalECMCost', {
      type: Sequelize.DECIMAL(10, 2), // Revert back to the previous precision and scale
      allowNull: true, // Or true if it was nullable
			defaultValue: 0,
    });
    await queryInterface.changeColumn('ecm_result_combinations_header', 'totalECPoints', {
      type: Sequelize.DECIMAL(10, 2), // Revert back to the previous precision and scale
      allowNull: true, // Or true if it was nullable
			defaultValue: 0,
    });
  }
};
