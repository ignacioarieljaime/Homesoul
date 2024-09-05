// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../helpers/dbConnection');

const AirTightnessMeasures = sequelize.define('air_tightness_level_measures', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    homeType: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    level: {
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
},{
    tableName: 'air_tightness_level_measures', // Specify the actual table name
    timestamps: false, // If you don't want Sequelize to manage createdAt and updatedAt fields automatically
}
);

module.exports = AirTightnessMeasures;
