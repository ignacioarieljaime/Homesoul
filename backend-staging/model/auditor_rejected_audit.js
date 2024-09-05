// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../helpers/dbConnection');

const AuditorRejectedAudit = sequelize.define('auditor_rejected_audit', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        auditorId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
				model: 'auditor',
				key: 'id'
			}
        },
        auditId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
				model: 'audits',
				key: 'id'
			}
        },
        rejectReason: {
            type: DataTypes.STRING(250),
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        isDeleted: {
            type: DataTypes.TINYINT(1),
            allowNull: true,
            defaultValue:0
        },
        // Add more fields as needed
    },{
        tableName: 'auditor_rejected_audit', // Specify the actual table name
        timestamps: true, // If you don't want Sequelize to manage createdAt and updatedAt fields automatically
    }
);

module.exports = AuditorRejectedAudit;
