"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTenderModel = exports.defineTenderModel = void 0;
const sequelize_1 = require("sequelize");
let Tender;
const defineTenderModel = (sequelize) => {
    Tender = sequelize.define('Tender', {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id',
            },
        },
        title: {
            type: sequelize_1.DataTypes.STRING(255),
            allowNull: false,
        },
        description: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        },
        category: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: false,
        },
        budget: {
            type: sequelize_1.DataTypes.DECIMAL(15, 2),
            allowNull: false,
        },
        deadline: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
        },
        location: {
            type: sequelize_1.DataTypes.STRING(255),
            allowNull: false,
        },
        requirements: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        },
        status: {
            type: sequelize_1.DataTypes.ENUM('open', 'in_progress', 'awarded', 'closed'),
            allowNull: false,
            defaultValue: 'open',
        },
        submissionDeadline: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
        },
        contactEmail: {
            type: sequelize_1.DataTypes.STRING(255),
            allowNull: false,
        },
        contactPhone: {
            type: sequelize_1.DataTypes.STRING(20),
            allowNull: false,
        },
        attachments: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true,
        },
    }, {
        // tableName: 'tenders',
        // freezeTableName: true,
        timestamps: true,
    });
    // Set up associations
    Tender.associate = (models) => {
        Tender.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user',
        });
    };
    return Tender;
};
exports.defineTenderModel = defineTenderModel;
// Export a function to get the Tender model
const getTenderModel = () => {
    if (!Tender) {
        throw new Error('Tender model not initialized. Make sure database connection is established first.');
    }
    return Tender;
};
exports.getTenderModel = getTenderModel;
exports.default = exports.getTenderModel;
