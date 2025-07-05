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
            const company = await company_service_1.default.createCompany({
                ...payload,
                userId,
            });
            res.status(201).json({ company });
        }
        catch (error) {
            console.error('Create company error:', error);
            res.status(500).json({ msg: 'Internal Server Error' });
        }
    }
    async getCompany(req, res) {
        try {
            const userId = req.user.id;
            const company = await company_service_1.default.getCompanyByUserId(userId);
            if (!company) {
                return res.status(404).json({ msg: 'Company not found' });
            }
            res.json({ company });
        }
        catch (error) {
            console.error('Get company error:', error);
            res.status(500).json({ msg: 'Internal Server Error' });
        }
    }
    async updateCompany(req, res) {
        try {
            const userId = req.user.id;
            const payload = req.body;
            const company = await company_service_1.default.updateCompany(userId, payload);
            res.json({ company });
        }
        catch (error) {
            console.error('Update company error:', error);
            if (error instanceof Error && error.message === 'Company not found') {
                return res.status(404).json({ msg: 'Company not found' });
            }
            res.status(500).json({ msg: 'Internal Server Error' });
        }
    }
    async deleteCompany(req, res) {
        try {
            const userId = req.user.id;
            const result = await company_service_1.default.deleteCompany(userId);
            res.json(result);
        }
        catch (error) {
            console.error('Delete company error:', error);
            if (error instanceof Error && error.message === 'Company not found') {
                return res.status(404).json({ msg: 'Company not found' });
            }
            res.status(500).json({ msg: 'Internal Server Error' });
        }
    }
    async getAllCompanies(req, res) {
        try {
            const companies = await company_service_1.default.getAllCompanies();
            res.json({ companies });
        }
        catch (error) {
            console.error('Get all companies error:', error);
            res.status(500).json({ msg: 'Internal Server Error' });
        }
    }
}
exports.default = new CompanyController();
