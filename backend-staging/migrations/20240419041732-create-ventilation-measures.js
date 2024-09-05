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
    await queryInterface.createTable('ventilation_measures', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      SRE: {
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
    await queryInterface.dropTable('ventilation_measures');
  }
};
