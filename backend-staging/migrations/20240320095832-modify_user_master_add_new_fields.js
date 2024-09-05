'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'user_master',
        'login_access_token',
        {
          type: Sequelize.STRING,
          after: "password",
          allowNull: true,
        },
      )
    ]);
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('user_master', 'login_access_token'),
    ]);
  }
};
