"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const application_service_1 = __importDefault(require("./application.service"));
class ApplicationController {
    async createApplication(req, res) {
        try {
            const userId = req.user.id;
            const payload = req.body;
            const application = await application_service_1.default.createApplication(userId, payload);
            res.status(201).json({ msg: 'Application created successfully', application });
        }
        catch (error) {
            console.error('Create application error:', error);
            if (error instanceof Error && error.message === 'Application already exists') {
                res.status(400).json({ msg: 'Application already exists for this user' });
            }
            else {
                res.status(500).json({ msg: 'Internal Server Error' });
            }
        }
    }
    async updateApplication(req, res) {
        try {
            const userId = req.user.id;
            const payload = req.body;
            const application = await application_service_1.default.updateApplication(userId, payload);
            res.json({ msg: 'Application updated successfully', application });
        }
        catch (error) {
            console.error('Update application error:', error);
            if (error instanceof Error && error.message === 'Application not found') {
                res.status(404).json({ msg: 'Application not found' });
            }
            res.status(500).json({ msg: 'Internal Server Error' });
        }
    }
    async getApplication(req, res) {
        try {
            const userId = req.user.id;
            const application = await application_service_1.default.getApplicationByUserId(userId);
            if (!application) {
                res.status(404).json({ msg: 'Application not found' });
            }
            res.json({ application });
        }
        catch (error) {
            console.error('Get application error:', error);
            res.status(500).json({ msg: 'Internal Server Error' });
        }
    }
    async getApplicationWithUser(req, res) {
        try {
            const userId = req.user.id;
            const result = await application_service_1.default.getApplicationWithUser(userId);
            if (!result) {
                res.status(404).json({ msg: 'User or application not found' });
            }
            else {
                res.json({ user: result.user, application: result.application });
            }
        }
        catch (error) {
            console.error('Get application with user error:', error);
            res.status(500).json({ msg: 'Internal Server Error' });
        }
    }
}
exports.default = new ApplicationController();
