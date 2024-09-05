'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.sequelize.query('ALTER TABLE `audits` CHANGE `auditorId` `auditorId` INT NULL DEFAULT NULL;');
	},

	down: async (queryInterface, Sequelize) => {
		 
	}
};