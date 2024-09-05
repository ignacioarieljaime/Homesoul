'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn('user_master', 'password', {
        type: Sequelize.STRING(255),
        allowNull: false
      }),
    ]);
  },

  async down (queryInterface, Sequelize) {

  }
};
