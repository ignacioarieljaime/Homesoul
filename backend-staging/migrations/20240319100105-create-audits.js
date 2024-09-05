'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		/**
		 * Add altering commands here.
		 *
		 * Example:
		 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
		 */
		await queryInterface.createTable('audits', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			auditorId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'auditor', // Name of the target table
					key: 'id' // Name of the target column
				},
				onDelete: 'CASCADE' // Delete the row from the table if the referenced row is deleted
			},
			auditRequestId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'user_audit_requests', // Name of the target table
					key: 'id' // Name of the target column
				},
				onDelete: 'CASCADE' // Delete the row from the table if the referenced row is deleted
			},
			projectName: {
				type: Sequelize.STRING(100),
				allowNull: true,
			},
			provinceId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'regions', // Name of the target table
					key: 'id' // Name of the target column
				},
				onDelete: 'CASCADE' // Delete the row from the table if the referenced row is deleted
			},
			weatherStationId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'weather_stations', // Name of the target table
					key: 'id' // Name of the target column
				},
				onDelete: 'CASCADE' // Delete the row from the table if the referenced row is deleted
			},
			hdd: {
                type: Sequelize.INTEGER,
                allowNull: true,
				defaultValue:0
            },
            nbcClimateZone: {
				type: Sequelize.STRING(10), // 10 digits in total, 2 after the decimal point
				allowNull: true
			},
			nbcPerspectiveTierId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'nbc_tier', // Name of the target table
					key: 'id' // Name of the target column
				},
				onDelete: 'CASCADE' // Delete the row from the table if the referenced row is deleted
			},
			houseTypeId: {
				type: Sequelize.INTEGER,
				allowNull: true
			},
			fdwrPercent: {
				type: Sequelize.DECIMAL(10, 2), // 10 digits in total, 2 after the decimal point
				allowNull: true,
				defaultValue: 0,
			},
			volume: {
				type: Sequelize.DECIMAL(10, 2), // 10 digits in total, 2 after the decimal point
				allowNull: true,
				defaultValue: 0,
			},
			credit: {
				type: Sequelize.DECIMAL(10, 2), // 10 digits in total, 2 after the decimal point
				allowNull: true,
				defaultValue: 0,
			},
			ecpRequired: {
				type: Sequelize.DECIMAL(10, 2), // 10 digits in total, 2 after the decimal point
				allowNull: true,
				defaultValue: 0,
			},
			firstName: {
				type: Sequelize.STRING(100), // 10 digits in total, 2 after the decimal point
				allowNull: true
			},
			lastName: {
				type: Sequelize.STRING(100), // 10 digits in total, 2 after the decimal point
				allowNull: true
			},
			emailId: {
				type: Sequelize.STRING(100), // 10 digits in total, 2 after the decimal point
				allowNull: true
			},
			pincode: {
				type: Sequelize.STRING(50), // 10 digits in total, 2 after the decimal point
				allowNull: true
			},
			addressLine1: {
				type: Sequelize.STRING(500), // 10 digits in total, 2 after the decimal point
				allowNull: true
			},
			addressLine2: {
				type: Sequelize.STRING(500), // 10 digits in total, 2 after the decimal point
				allowNull: true
			},
			auditStatusId: {
				type: Sequelize.INTEGER, // 10 digits in total, 2 after the decimal point
				allowNull: true
			},
			reportLink: {
				type: Sequelize.STRING(100), // 10 digits in total, 2 after the decimal point
				allowNull: true
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
			},
			isDeleted: {
				type: Sequelize.TINYINT,
				allowNull: true,
				defaultValue: 0
			},
		});
  	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('audits');
	}
};
