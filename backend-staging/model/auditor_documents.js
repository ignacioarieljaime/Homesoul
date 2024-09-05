// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../helpers/dbConnection');
const UserModel = require('../model/user');
const AuditorModel = require('../model/auditor');

const AuditorDocuments = sequelize.define('auditor_documents', {
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
			}
        },
        documentTypeId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        documentFile: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        isVerified: {
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
            type: DataTypes.TINYINT(1),
            allowNull: true,
            defaultValue:0
        },
        // Add more fields as needed
    },{
        tableName: 'auditor_documents', // Specify the actual table name
        timestamps: true, // If you don't want Sequelize to manage createdAt and updatedAt fields automatically
    }
);
// AuditorDocuments.belongsTo(AuditorModel, { foreignKey: 'auditorId', as :'AuditorInfo' });


module.exports = AuditorDocuments;
