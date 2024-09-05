// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../helpers/dbConnection');
const Regions = require('./regions');

const AuditorPincode = sequelize.define('auditor_pincode', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    auditorId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'auditor',
            key: 'id'
        },
        onDelete: 'CASCADE' // Delete the row from the table if the referenced row is deleted
    },
    pincode: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    provinceId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'regions', // Name of the target table
            key: 'id' // Name of the target column
        },
        onDelete: 'CASCADE' // Delete the row from the table if the referenced row is deleted
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
    tableName: 'auditor_pincode', // Specify the actual table name
    timestamps: true, // If you don't want Sequelize to manage createdAt and updatedAt fields automatically
}
);
AuditorPincode.belongsTo(Regions, { as: 'regions', foreignKey: 'provinceId' });

module.exports = AuditorPincode;
