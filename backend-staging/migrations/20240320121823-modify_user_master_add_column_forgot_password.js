'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'user_master',
        'forgotPasswordCodeExpires',
        {
          allowNull: true,
          type: Sequelize.INTEGER,
          after: "forgotPasswordCode",
        },
      )
    ]);
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('user_master', 'forgotPasswordCodeExpires'),
    ]);
  }
};
