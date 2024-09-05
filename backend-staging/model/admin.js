// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../helpers/dbConnection');
const { Type } = require("../helpers/enum");

const Admin = sequelize.define('admin', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    firstName: {
        type: DataTypes.STRING(30),
        allowNull: true
    },
    lastName: {
        type: DataTypes.STRING(30),
        allowNull: true
    },
    emailID: {
        type: DataTypes.STRING(320),
        allowNull: true
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    login_access_token: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    phoneNo: {
        type: DataTypes.STRING(15),
        allowNull: true
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
        type: DataTypes.TINYINT(1),
        allowNull: true,
        defaultValue: 0
    },
    // Add more fields as needed
}, {
    tableName: 'admin', // Specify the actual table name
    timestamps: true, // If you don't want Sequelize to manage createdAt and updatedAt fields automatically
}
);

module.exports = Admin;
