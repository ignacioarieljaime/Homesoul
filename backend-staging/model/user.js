// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../helpers/dbConnection');
const { Type } = require("../helpers/enum");
const Auditor = require('./auditor');

const User = sequelize.define('user_master', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    userType: {
        type: DataTypes.INTEGER,
        allowNull: true,
        enum: [Type.Engineer, Type.Customer],
        defaultValue: Type.Engineer
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
        allowNull: true,
        defaultValue: null
    },
    login_access_token: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    phoneNo: {
        type: DataTypes.STRING(15),
        allowNull: true
    },
    pincode: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    provinceId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'regions',
            key: 'id'
        }
    },
    addressLine1: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    addressLine2: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    forgotPasswordCode: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    forgotPasswordCodeExpires: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    emailVerificationCode: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    isEmailVerified: {
        type: DataTypes.TINYINT(1),
        allowNull: true,
        defaultValue: 0,
    },
    isPhoneVerified: {
        type: DataTypes.TINYINT(1),
        allowNull: true,
        defaultValue: 0,
    },
    energy_audit: {
        type: DataTypes.TINYINT(1),
        allowNull: true,
        defaultValue: 0
    },
    consultation: {
        type: DataTypes.TINYINT(1),
        allowNull: true,
        defaultValue: 0
    },
    seeking_investment: {
        type: DataTypes.TINYINT(1),
        allowNull: true,
        defaultValue: 0
    },
    is_offline: {
        type: DataTypes.TINYINT(1),
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
        type: DataTypes.TINYINT(1),
        allowNull: true,
        defaultValue: 0
    },
    // Add more fields as needed
}, {
    tableName: 'user_master', // Specify the actual table name
    timestamps: true, // If you don't want Sequelize to manage createdAt and updatedAt fields automatically
}
);
module.exports = User;
User.hasOne(Auditor, { foreignKey: 'userId' });
