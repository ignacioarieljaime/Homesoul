// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../helpers/dbConnection');
const UserModel = require('../model/user');
const AuditorDocuments = require('./auditor_documents');

const Auditor = sequelize.define('auditor', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'user_master',
            key: 'id'
        }
    },
    companyId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    pincode: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    addressLine1: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    addressLine2: {
        type: DataTypes.STRING(500),
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
    tableName: 'auditor', // Specify the actual table name
    timestamps: true, // If you don't want Sequelize to manage createdAt and updatedAt fields automatically
}
);
// Auditor.belongsTo(UserModel, { foreignKey: 'userId', as :'UserInfo' });
Auditor.hasOne(AuditorDocuments, { foreignKey: 'auditorId' });


module.exports = Auditor;
