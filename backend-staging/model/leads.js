// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../helpers/dbConnection');

const Leads = sequelize.define('leads', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    city: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    province: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    country: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    status: {
        type: DataTypes.TINYINT,
        allowNull: true,
        defaultValue: 0
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
    tableName: 'leads', // Specify the actual table name
    timestamps: true, // If you don't want Sequelize to manage createdAt and updatedAt fields automatically
}
);


module.exports = Leads;
