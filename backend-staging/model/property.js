// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../helpers/dbConnection');
const Regions = require('./regions');

const Property = sequelize.define('property', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'user_master',
            key: 'id'
        }
    },
    type: {
        type: DataTypes.TINYINT,
        allowNull: true,
        defaultValue: 0
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    provinceId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'regions',
            key: 'id'
        }
    },
    postalCode: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    status: {
        type: DataTypes.TINYINT,
        allowNull: true,
        defaultValue: 1
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
}, {
    tableName: 'property', // Specify the actual table name
    timestamps: true, // If you don't want Sequelize to manage createdAt and updatedAt fields automatically
}
);

Property.belongsTo(Regions, { as: 'regions', foreignKey: 'provinceId' });

module.exports = Property;
