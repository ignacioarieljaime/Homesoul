// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../helpers/dbConnection');

const WaterHeatingEquipmentMeasures = sequelize.define('water_heating_equipment_measures', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    UEF: {
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
    tableName: 'water_heating_equipment_measures', // Specify the actual table name
    timestamps: false, // If you don't want Sequelize to manage createdAt and updatedAt fields automatically
}
);

module.exports = WaterHeatingEquipmentMeasures;
