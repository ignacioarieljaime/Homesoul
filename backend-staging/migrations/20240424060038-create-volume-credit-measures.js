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
    await queryInterface.createTable('volume_credit_measures', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      unit: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      lBound: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      uBound: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      ecPoints: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('volume_credit_measures');
  }
};
