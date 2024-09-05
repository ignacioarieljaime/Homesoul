// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../helpers/dbConnection');

const AssemblyCategory = sequelize.define('assembly_category', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING(100),
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
            defaultValue:0
        },
        // Add more fields as needed
    },{
        tableName: 'assembly_category', // Specify the actual table name
        timestamps: true, // If you don't want Sequelize to manage createdAt and updatedAt fields automatically
    }
);


module.exports = AssemblyCategory;
