// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../helpers/dbConnection');

const GasFireFurnaceMeasures = sequelize.define('gas_fire_furnaces_measures', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    AFUE: {
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
    tableName: 'gas_fire_furnaces_measures', // Specify the actual table name
    timestamps: false, // If you don't want Sequelize to manage createdAt and updatedAt fields automatically
}
);

module.exports = GasFireFurnaceMeasures;
