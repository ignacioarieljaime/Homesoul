// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../helpers/dbConnection');

const FenestrationAndDoorMeasures = sequelize.define('fenestration_and_door_measures', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    max_uValue: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    min_energy_rating: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    zone: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    ecPoints: {
        type: DataTypes.DECIMAL(10, 2), // 10 digits in total, 2 after the decimal point
        allowNull: true,
        defaultValue: 0,
    }
}, {
    tableName: 'fenestration_and_door_measures', // Specify the actual table name
    timestamps: false, // If you don't want Sequelize to manage createdAt and updatedAt fields automatically
}
);

module.exports = FenestrationAndDoorMeasures;
