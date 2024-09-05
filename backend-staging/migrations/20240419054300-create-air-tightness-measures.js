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
    await queryInterface.createTable('air_tightness_level_measures', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      homeType: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      level: {
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
    await queryInterface.dropTable('air_tightness_level_measures');
  }
};
