// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../helpers/dbConnection');
const UserAuditRequests = require('../model/user_audit_requests');
const RegionModel = require('../model/regions');
const WeatherModel = require('../model/weather_stations');
const NbcModel = require('../model/nbc_tier');
const AuditLogs = require('../model/audit_status_log');
const AuditAssemblySelection = require("../model/audit_assembly_selection");
const Regions = require('../model/regions');
const Property = require('./property');
const Auditor = require('./auditor');

const Audits = sequelize.define('audits', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
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
    auditorId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'auditor', // Name of the target table
            key: 'id' // Name of the target column
        },
        onDelete: 'CASCADE' // Delete the row from the table if the referenced row is deleted
    },
    auditRequestId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'user_audit_requests', // Name of the target table
            key: 'id' // Name of the target column
        },
        onDelete: 'CASCADE' // Delete the row from the table if the referenced row is deleted
    },
    projectName: {
        type: DataTypes.STRING(100),
        allowNull: true,
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
    weatherStationId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'weather_stations', // Name of the target table
            key: 'id' // Name of the target column
        },
        onDelete: 'CASCADE' // Delete the row from the table if the referenced row is deleted
    },
    hdd: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    nbcClimateZone: {
        type: DataTypes.STRING(10),
        allowNull: true
    },
    nbcPerspectiveTierId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'nbc_tier', // Name of the target table
            key: 'id' // Name of the target column
        },
        onDelete: 'CASCADE' // Delete the row from the table if the referenced row is deleted
    },
    houseTypeId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    fdwrPercent: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0,
    },
    volume: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0,
    },
    unit: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    credit: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0,
    },
    ecpRequired: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0,
    },
    firstName: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    lastName: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    emailId: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    pincode1: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    pincode2: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    phone: {
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
    userProvinceId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'regions',
            key: 'id'
        }
    },
    auditStatusId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    rejectReason: {
        type: DataTypes.STRING(250),
        allowNull: true
    },
    reportLink: {
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
        type: DataTypes.TINYINT,
        allowNull: true,
        defaultValue: 0
    },
    // Add more fields as needed
}, {
    tableName: 'audits', // Specify the actual table name
    timestamps: true, // If you don't want Sequelize to manage createdAt and updatedAt fields automatically
}
);


Audits.belongsTo(UserAuditRequests, { foreignKey: 'auditRequestId' });
Audits.belongsTo(RegionModel, { foreignKey: 'provinceId', as: 'RegionInfo' });
Audits.belongsTo(WeatherModel, { foreignKey: 'weatherStationId', as: 'WeatherStationsInfo' });
Audits.belongsTo(NbcModel, { foreignKey: 'nbcPerspectiveTierId', as: 'NBCTierInfo' });
Audits.hasMany(AuditLogs, { foreignKey: 'auditId', as: 'auditStatusLogs' });
Audits.hasMany(AuditAssemblySelection, { foreignKey: 'auditId', as: 'auditAssemblySelection' });
Audits.belongsTo(Property, { as: 'property', foreignKey: 'propertyId' });
Audits.belongsTo(Auditor, { as: 'auditorInfo', foreignKey: 'auditorId' });

module.exports = Audits;
