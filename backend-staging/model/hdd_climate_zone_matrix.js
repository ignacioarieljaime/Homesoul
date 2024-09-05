// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../helpers/dbConnection');

const HDDClimateZoneMatrix = sequelize.define('hdd_climate_zone_matrix', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    minHdd: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    maxHdd: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    zone: {
        type: DataTypes.STRING(10),
        allowNull: true,
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
        tableName: 'hdd_climate_zone_matrix', // Specify the actual table name
        timestamps: true, // If you don't want Sequelize to manage createdAt and updatedAt fields automatically
    }
);


module.exports = HDDClimateZoneMatrix;
