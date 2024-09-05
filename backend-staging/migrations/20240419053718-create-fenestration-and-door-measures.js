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
    await queryInterface.createTable('fenestration_and_door_measures', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      max_uValue: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      min_energy_rating: {
        type: Sequelize.STRING(50),
        allowNull: true
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
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('fenestration_and_door_measures');
  }
};
