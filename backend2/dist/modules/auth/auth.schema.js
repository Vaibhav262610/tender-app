"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserModel = exports.defineUserModel = void 0;
const sequelize_1 = require("sequelize");
let User;
const defineUserModel = (sequelize) => {
    User = sequelize.define('User', {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        companyname: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        firstname: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        lastname: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        jobtitle: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            validate: { isEmail: true },
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        refreshToken: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true,
        },
    });
    return User;
};
exports.defineUserModel = defineUserModel;
// Export a function to get the User model
const getUserModel = () => {
    if (!User) {
        throw new Error('User model not initialized. Make sure database connection is established first.');
    }
    return User;
};
exports.getUserModel = getUserModel;
exports.default = exports.getUserModel;
