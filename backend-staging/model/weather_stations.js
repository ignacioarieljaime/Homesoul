// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../helpers/dbConnection');
const Region = require('./regions');

const WeatherStations = sequelize.define('weather_stations', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    regionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'regions', // Name of the target table
            key: 'id' // Name of the target column
        },
        onDelete: 'CASCADE' // Delete the row from the table if the referenced row is deleted
    },
    weatherStationTitle: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    hdd: {
        type: DataTypes.INTEGER,
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
        tableName: 'weather_stations', // Specify the actual table name
        timestamps: true, // If you don't want Sequelize to manage createdAt and updatedAt fields automatically
    }
);
WeatherStations.belongsTo(Region, { foreignKey: 'regionId' });

module.exports = WeatherStations;
