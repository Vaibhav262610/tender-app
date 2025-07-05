"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const company_service_1 = __importDefault(require("./company.service"));
class CompanyController {
    async createCompany(req, res) {
        try {
            const userId = req.user.id;
            const payload = req.body;
            const company = await company_service_1.default.createCompany(userId, payload);
            res.status(201).json({ msg: 'Company created successfully', company });
        }
        catch (error) {
            console.error('Create company error:', error);
            if (error instanceof Error && error.message === 'Company already exists') {
                res.status(400).json({ msg: 'Company already exists for this user' });
            }
            else {
                res.status(500).json({ msg: 'Internal Server Error' });
            }
        }
    }
    async updateCompany(req, res) {
        try {
            const userId = req.user.id;
            const payload = req.body;
            const company = await company_service_1.default.updateCompany(userId, payload);
            res.json({ msg: 'Company updated successfully', company });
        }
        catch (error) {
            console.error('Update company error:', error);
            if (error instanceof Error && error.message === 'Company not found') {
                res.status(404).json({ msg: 'Company not found' });
            }
            res.status(500).json({ msg: 'Internal Server Error' });
        }
    }
    async getCompany(req, res) {
        try {
            const userId = req.user.id;
            const company = await company_service_1.default.getCompanyByUserId(userId);
            if (!company) {
                res.status(404).json({ msg: 'Company not found' });
            }
            res.json({ company });
        }
        catch (error) {
            console.error('Get company error:', error);
            res.status(500).json({ msg: 'Internal Server Error' });
        }
    }
    async getCompanyWithUser(req, res) {
        try {
            const userId = req.user.id;
            const result = await company_service_1.default.getCompanyWithUser(userId);
            if (!result) {
                res.status(404).json({ msg: 'User or company not found' });
            }
            else {
                res.json({ user: result.user, company: result.company });
            }
        }
        catch (error) {
            console.error('Get company with user error:', error);
            res.status(500).json({ msg: 'Internal Server Error' });
        }
    }
}
exports.default = new CompanyController();
