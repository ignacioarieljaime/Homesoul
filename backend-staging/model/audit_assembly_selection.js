// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../helpers/dbConnection');
const AssemblyCategory = require('./assembly_category');
const Assembly = require('./assembly');


const AuditAssemblySelection = sequelize.define('audit_assembly_selection', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    auditId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'audits', // Name of the target table
            key: 'id' // Name of the target column
        },
        onDelete: 'CASCADE' // Delete the row from the table if the referenced row is deleted
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
    assemblyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'assembly', // Name of the target table
            key: 'id' // Name of the target column
        },
        onDelete: 'CASCADE' // Delete the row from the table if the referenced row is deleted
    },
    cost: {
        type: DataTypes.DECIMAL(10, 2), // 10 digits in total, 2 after the decimal point
        allowNull: true,
        defaultValue: 0,
    },
    ecp: {
        type: DataTypes.DECIMAL(10, 2), // 10 digits in total, 2 after the decimal point
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
}, {
    tableName: 'audit_assembly_selection', // Specify the actual table name
    timestamps: true, // If you don't want Sequelize to manage createdAt and updatedAt fields automatically
}
);

AuditAssemblySelection.belongsTo(AssemblyCategory, { foreignKey: 'assemblyCategoryId' });
AuditAssemblySelection.belongsTo(Assembly, { foreignKey: 'assemblyId' });

module.exports = AuditAssemblySelection;
