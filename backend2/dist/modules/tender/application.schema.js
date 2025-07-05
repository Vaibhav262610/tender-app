"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineApplicationModel = exports.Application = void 0;
const sequelize_1 = require("sequelize");
class Application extends sequelize_1.Model {
    id;
    tenderId;
    userId;
    companyName;
    contactPerson;
    email;
    phone;
    address;
    city;
    state;
    country;
    zipCode;
    website;
    companySize;
    yearsInBusiness;
    relevantExperience;
    proposedSolution;
    timeline;
    budget;
    teamSize;
    technicalApproach;
    riskMitigation;
    qualityAssurance;
    references;
    certifications;
    financialDocuments;
    portfolio;
    additionalInfo;
    status;
    createdAt;
    updatedAt;
    static associate(models) {
        Application.belongsTo(models.Tender, { foreignKey: 'tenderId', as: 'tender' });
        Application.belongsTo(models.User, { foreignKey: 'userId', as: 'applicant' });
    }
}
exports.Application = Application;
const defineApplicationModel = (sequelize) => {
    Application.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        tenderId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'tenders',
                key: 'id',
            },
        },
        userId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        companyName: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        contactPerson: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
            },
        },
        phone: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        },
        city: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        state: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        country: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        zipCode: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        website: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        companySize: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        yearsInBusiness: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        relevantExperience: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        },
        proposedSolution: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        },
        timeline: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        budget: {
            type: sequelize_1.DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        teamSize: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        technicalApproach: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        },
        riskMitigation: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        },
        qualityAssurance: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        },
        references: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        },
        certifications: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true,
        },
        financialDocuments: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true,
        },
        portfolio: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true,
        },
        additionalInfo: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true,
        },
        status: {
            type: sequelize_1.DataTypes.ENUM('pending', 'reviewed', 'shortlisted', 'rejected', 'awarded'),
            allowNull: false,
            defaultValue: 'pending',
        },
    }, {
        sequelize,
        tableName: 'applications',
        timestamps: true,
    });
    return Application;
};
exports.defineApplicationModel = defineApplicationModel;
