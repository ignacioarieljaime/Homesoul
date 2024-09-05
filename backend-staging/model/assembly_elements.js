// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../helpers/dbConnection');
const Assembly = require('./assembly');

const AssemblyElement = sequelize.define('assembly_elements', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    assemblyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'assembly', // Name of the target table
            key: 'id' // Name of the target column
        },
        onDelete: 'CASCADE' // Delete the row from the table if the referenced row is deleted
    },
    elementTitle: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    elementDetails: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    table: {
        type: DataTypes.STRING(50), // 10 digits in total, 2 after the decimal point
        allowNull: true,
        defaultValue: 0,
    },
    effectiveRSI: {
        type: DataTypes.DECIMAL(5, 2), // 10 digits in total, 2 after the decimal point
        allowNull: true,
        defaultValue: 0,
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
        tableName: 'assembly_elements', // Specify the actual table name
        timestamps: true, // If you don't want Sequelize to manage createdAt and updatedAt fields automatically
    }
);

// AssemblyElement.belongsTo(Assembly, { foreignKey: 'assemblyId' });

module.exports = AssemblyElement;
