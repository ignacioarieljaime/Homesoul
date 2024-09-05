// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../helpers/dbConnection');
const UserModel = require('../model/user');
const UserHomeModel = require('../model/user_home');

const UserAuditRequests = sequelize.define('user_audit_requests', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    propertyId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'property', // Name of the target table
            key: 'id' // Name of the target column
        },
        onDelete: 'CASCADE' // Delete the row from the table if the referenced row is deleted
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'user_master',
            key: 'id'
        }
    },
    homeId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'user_home',
            key: 'id'
        }
    },
    pincode: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    auditStatusId: {
        type: DataTypes.INTEGER,
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
    tableName: 'user_audit_requests', // Specify the actual table name
    timestamps: true, // If you don't want Sequelize to manage createdAt and updatedAt fields automatically
}
);
UserAuditRequests.belongsTo(UserModel, { foreignKey: 'userId', as: 'UserInfo' });
UserAuditRequests.belongsTo(UserHomeModel, { foreignKey: 'homeId', as: 'UserHomeInfo' });


module.exports = UserAuditRequests;
