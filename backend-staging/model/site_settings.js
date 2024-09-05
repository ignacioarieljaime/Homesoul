// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../helpers/dbConnection');

const SiteSettings = sequelize.define('site_settings', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    key: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    value: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    // Add more fields as needed
}, {
    tableName: 'site_settings', // Specify the actual table name
    timestamps: false, // If you don't want Sequelize to manage createdAt and updatedAt fields automatically
}
);


module.exports = SiteSettings;