"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCompanyModel = exports.defineCompanyModel = void 0;
const sequelize_1 = require("sequelize");
let Company;
const defineCompanyModel = (sequelize) => {
    Company = sequelize.define('Company', {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        logoUrl: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true, // optional
        },
        industry: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        aboutCompany: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        },
        foundedYear: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        companySize: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        companyLocation: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        companyWebsite: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        contactEmail: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        contactNumber: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        productsOrServices: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true,
        },
    }, {
        //   tableName: 'companies',
        //   freezeTableName: true,
        timestamps: true, // adds createdAt & updatedAt
    });
    return Company;
};
exports.defineCompanyModel = defineCompanyModel;
// Export a function to get the Company model
const getCompanyModel = () => {
    if (!Company) {
        throw new Error('Company model not initialized. Make sure database connection is established first.');
    }
    return Company;
};
exports.getCompanyModel = getCompanyModel;
exports.default = exports.getCompanyModel;
