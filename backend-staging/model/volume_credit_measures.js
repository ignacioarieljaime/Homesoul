// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../helpers/dbConnection');

const VolumeCreditMeasures = sequelize.define('volume_credit_measures', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    unit: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    lBound: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
    },
    uBound: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
    },
    ecPoints: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
    }
}, {
    tableName: 'volume_credit_measures', // Specify the actual table name
    timestamps: false, // If you don't want Sequelize to manage createdAt and updatedAt fields automatically
}
);

module.exports = VolumeCreditMeasures;
