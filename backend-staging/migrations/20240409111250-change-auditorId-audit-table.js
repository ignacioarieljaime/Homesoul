'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.sequelize.query('ALTER TABLE `audits` CHANGE `provinceId` `provinceId` INT NULL DEFAULT NULL, CHANGE `weatherStationId` `weatherStationId` INT NULL DEFAULT NULL, CHANGE `nbcPerspectiveTierId` `nbcPerspectiveTierId` INT NULL DEFAULT NULL;');
	},

	down: async (queryInterface, Sequelize) => {
		 
	}
};