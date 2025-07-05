"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApplicationModel = exports.defineApplicationModel = void 0;
const sequelize_1 = require("sequelize");
let Application;
const defineApplicationModel = (sequelize) => {
    Application = sequelize.define('Application', {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        tenderId: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        userId: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        companyId: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            validate: { isEmail: true },
        },
        updatedAt: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
    });
    return Application;
};
exports.defineApplicationModel = defineApplicationModel;
const getApplicationModel = () => {
    if (!Application) {
        throw new Error('Application model not initialized. Make sure database connection is established first.');
    }
    return Application;
};
exports.getApplicationModel = getApplicationModel;
exports.default = exports.getApplicationModel;
