'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('assembly', 'max_uValue', {
      type: Sequelize.STRING(50),
      allowNull: true,
      after: 'totalEffectiveRValue' // Specify the column name after which this column should be added

    });
    await queryInterface.addColumn('assembly', 'min_energy_rating', {
      type: Sequelize.STRING(50),
      allowNull: true,
      after: 'max_uValue' // Specify the column name after which this column should be added

    });
    await queryInterface.addColumn('assembly', 'energy_efficiency', {
      type: Sequelize.STRING(50),
      allowNull: true,
      after: 'min_energy_rating' // Specify the column name after which this column should be added
    });
    await queryInterface.addColumn('assembly', 'homeType', {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
      after: 'energy_efficiency' // Specify the column name after which this column should be added
    });
    
    await queryInterface.addColumn('assembly', 'levels', {
      type: Sequelize.STRING(50),
      allowNull: true,
      after: 'homeType' // Specify the column name after which this column should be added
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
