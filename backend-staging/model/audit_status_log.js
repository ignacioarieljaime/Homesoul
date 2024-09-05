// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../helpers/dbConnection');
const Audit = require('./audits');

const AuditStatusLog = sequelize.define('audit_status_log', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    auditId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'audits', // Name of the target table
            key: 'id' // Name of the target column
        },
        onDelete: 'CASCADE' // Delete the row from the table if the referenced row is deleted
    },
    auditStatusId: {
        type: DataTypes.INTEGER, // 10 digits in total, 2 after the decimal point
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
}, {
    tableName: 'audit_status_log', // Specify the actual table name
    timestamps: true, // If you don't want Sequelize to manage createdAt and updatedAt fields automatically
}
);

module.exports = AuditStatusLog;
