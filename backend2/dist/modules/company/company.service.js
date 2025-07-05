"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const company_schema_1 = require("./company.schema");
const dbConnection_1 = require("../../db/dbConnection");
class CompanyService {
    async createCompany(userId, payload) {
        const Company = (0, company_schema_1.getCompanyModel)();
        // Check if company already exists for this user
        const existingCompany = await Company.findOne({ where: { userId } });
        if (existingCompany) {
            throw new Error('Company already exists');
        }
        const company = await Company.create({
            userId,
            ...payload,
        });
        return company.get();
    }
    async updateCompany(userId, payload) {
        const Company = (0, company_schema_1.getCompanyModel)();
        const company = await Company.findOne({ where: { userId } });
        if (!company) {
            throw new Error('Company not found');
        }
        await company.update(payload);
        return company.get();
    }
    async getCompanyByUserId(userId) {
        const Company = (0, company_schema_1.getCompanyModel)();
        const company = await Company.findOne({ where: { userId } });
        if (!company)
            return null;
        return company.get();
    }
    async getCompanyWithUser(userId) {
        const User = dbConnection_1.sequelize.models.User;
        const user = await User.findByPk(userId);
        if (!user)
            return null;
        const Company = (0, company_schema_1.getCompanyModel)();
        const company = await Company.findOne({ where: { userId } });
        return {
            user: user.get(),
            company: company ? company.get() : null,
        };
    }
}
exports.default = new CompanyService();
