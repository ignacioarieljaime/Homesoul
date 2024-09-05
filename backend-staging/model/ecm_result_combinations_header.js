// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../helpers/dbConnection');

const ECMResultCombinationsHeader = sequelize.define('ecm_result_combinations_header', {
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
    totalECPoints: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0,
    },
    totalECMCost: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0,
    },
    ecmCostIndex: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
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
        type: DataTypes.TINYINT,
        allowNull: true,
        defaultValue: 0
    },
        // Add more fields as needed
    },{
        tableName: 'ecm_result_combinations_header', // Specify the actual table name
        timestamps: true, // If you don't want Sequelize to manage createdAt and updatedAt fields automatically
    }
);


module.exports = ECMResultCombinationsHeader;
