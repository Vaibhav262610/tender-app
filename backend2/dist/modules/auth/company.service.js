"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_schema_1 = require("./auth.schema");
class CompanyService {
    async createCompany(payload) {
        const company = await auth_schema_1.Company.create(payload);
        return company.dataValues;
    }
    async getCompanyByUserId(userId) {
        const company = await auth_schema_1.Company.findOne({ where: { userId } });
        return company ? company.get() : null;
    }
    async updateCompany(userId, payload) {
        const company = await auth_schema_1.Company.findOne({ where: { userId } });
        if (!company) {
            throw new Error('Company not found');
        }
        await company.update(payload);
        return company.get();
    }
    async deleteCompany(userId) {
        const company = await auth_schema_1.Company.findOne({ where: { userId } });
        if (!company) {
            throw new Error('Company not found');
        }
        await company.destroy();
        return { message: 'Company deleted successfully' };
    }
    async getAllCompanies() {
        const companies = await auth_schema_1.Company.findAll();
        return companies.map((company) => company.get());
    }
}
exports.default = new CompanyService();
