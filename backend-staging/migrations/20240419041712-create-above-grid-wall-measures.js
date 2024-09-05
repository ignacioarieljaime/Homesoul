'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('above_grid_wall_measures', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      rsi: {
        type: Sequelize.DECIMAL(5, 2), // 5 digits in total, 2 after the decimal point
        allowNull: true,
        defaultValue: 0,
      },
      zone: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      ecPoints: {
        type: Sequelize.DECIMAL(10, 2), // 10 digits in total, 2 after the decimal point
        allowNull: true,
        defaultValue: 0,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('above_grid_wall_measures');
  }
};
