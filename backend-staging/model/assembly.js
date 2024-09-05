// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../helpers/dbConnection');
const AssemblyCategory = require('./assembly_category');
const AssemblyElement = require('./assembly_elements');

const Assembly = sequelize.define('assembly', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    assemblyCategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'assembly_category', // Name of the target table
            key: 'id' // Name of the target column
        },
        onDelete: 'CASCADE' // Delete the row from the table if the referenced row is deleted
    },
    assemblyTitle: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    subTitle: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    standardCost: {
        type: DataTypes.DECIMAL(10, 2), // 10 digits in total, 2 after the decimal point
        allowNull: true,
        defaultValue: 0,
    },
    totalEffectiveRSI: {
        type: DataTypes.DECIMAL(10, 2), // 10 digits in total, 2 after the decimal point
        allowNull: true,
        defaultValue: 0,
    },
    totalEffectiveRValue: {
        type: DataTypes.DECIMAL(10, 2), // 10 digits in total, 2 after the decimal point
        allowNull: true,
        defaultValue: 0,
    },
    max_uValue: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    min_energy_rating: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    energy_efficiency: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    homeType: {
        type: DataTypes.INTEGER(100),
        allowNull: true,
    },
    levels: {
        type: DataTypes.STRING(100),
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
}, {
    tableName: 'assembly', // Specify the actual table name
    timestamps: true, // If you don't want Sequelize to manage createdAt and updatedAt fields automatically
}
);

Assembly.belongsTo(AssemblyCategory, { foreignKey: 'assemblyCategoryId' });
Assembly.hasMany(AssemblyElement, { foreignKey: 'assemblyId', as: 'assemblyElement' });

module.exports = Assembly;
