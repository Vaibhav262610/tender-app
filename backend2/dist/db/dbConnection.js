"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = exports.dbConnection = void 0;
const sequelize_1 = require("sequelize");
const auth_schema_1 = require("../modules/auth/auth.schema");
const company_schema_1 = require("../modules/company/company.schema");
const tender_schema_1 = require("../modules/tender/tender.schema");
// Create sequelize instance immediately
const sequelize = new sequelize_1.Sequelize('tender', 'postgres', 'oppoa33f', {
    host: 'localhost',
    dialect: 'postgres',
});
exports.sequelize = sequelize;
const dbConnection = async ({ database, username, password }) => {
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully');
        // Define models
        const User = (0, auth_schema_1.defineUserModel)(sequelize);
        const Company = (0, company_schema_1.defineCompanyModel)(sequelize);
        const Tender = (0, tender_schema_1.defineTenderModel)(sequelize);
        // Set up associations
        if (Tender.associate) {
            Tender.associate({ User, Company });
        }
        // Sync all models
        // await sequelize.sync({ alter: true });
        // console.log('Tables created successfully');
        console.log('POSTGRES DB CONNECTED SUCCESSFULLY');
    }
    catch (error) {
        console.error('Error in connecting to database:', error);
        throw error;
    }
};
exports.dbConnection = dbConnection;
exports.default = {};
