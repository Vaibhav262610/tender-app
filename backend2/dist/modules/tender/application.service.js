"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const application_schema_1 = require("./application.schema");
const tender_schema_1 = require("./tender.schema");
const auth_schema_1 = require("../auth/auth.schema");
class ApplicationService {
    async createApplication(applicationData) {
        try {
            // Check if tender exists and is open
            const Tender = (0, tender_schema_1.getTenderModel)();
            const tender = await Tender.findByPk(applicationData.tenderId);
            if (!tender) {
                throw new Error('Tender not found');
            }
            if (tender.status !== 'open') {
                throw new Error('Tender is not open for applications');
            }
            // Check if user has already applied to this tender
            const existingApplication = await application_schema_1.Application.findOne({
                where: {
                    tenderId: applicationData.tenderId,
                    userId: applicationData.userId,
                },
            });
            if (existingApplication) {
                throw new Error('You have already applied to this tender');
            }
            // Create the application
            const application = await application_schema_1.Application.create(applicationData);
            return application;
        }
        catch (error) {
            throw error;
        }
    }
    async getApplicationById(id) {
        try {
            const Tender = (0, tender_schema_1.getTenderModel)();
            const User = (0, auth_schema_1.getUserModel)();
            const application = await application_schema_1.Application.findByPk(id, {
                include: [
                    {
                        model: Tender,
                        as: 'tender',
                        include: [
                            {
                                model: User,
                                as: 'user',
                                include: [
                                    {
                                        model: require('../company/company.schema').Company,
                                        as: 'company',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        model: User,
                        as: 'applicant',
                    },
                ],
            });
            return application;
        }
        catch (error) {
            throw error;
        }
    }
    async getApplicationsByTenderId(tenderId) {
        try {
            const User = (0, auth_schema_1.getUserModel)();
            const applications = await application_schema_1.Application.findAll({
                where: { tenderId },
                include: [
                    {
                        model: User,
                        as: 'applicant',
                    },
                ],
                order: [['createdAt', 'DESC']],
            });
            return applications;
        }
        catch (error) {
            throw error;
        }
    }
    async getApplicationsByUserId(userId) {
        try {
            const Tender = (0, tender_schema_1.getTenderModel)();
            const User = (0, auth_schema_1.getUserModel)();
            const applications = await application_schema_1.Application.findAll({
                where: { userId },
                include: [
                    {
                        model: Tender,
                        as: 'tender',
                        include: [
                            {
                                model: User,
                                as: 'user',
                                include: [
                                    {
                                        model: require('../company/company.schema').Company,
                                        as: 'company',
                                    },
                                ],
                            },
                        ],
                    },
                ],
                order: [['createdAt', 'DESC']],
            });
            return applications;
        }
        catch (error) {
            throw error;
        }
    }
    async updateApplicationStatus(id, status) {
        try {
            const application = await application_schema_1.Application.findByPk(id);
            if (!application) {
                throw new Error('Application not found');
            }
            const validStatuses = ['pending', 'reviewed', 'shortlisted', 'rejected', 'awarded'];
            if (!validStatuses.includes(status)) {
                throw new Error('Invalid status');
            }
            application.status = status;
            await application.save();
            return application;
        }
        catch (error) {
            throw error;
        }
    }
    async deleteApplication(id) {
        try {
            const application = await application_schema_1.Application.findByPk(id);
            if (!application) {
                throw new Error('Application not found');
            }
            await application.destroy();
            return true;
        }
        catch (error) {
            throw error;
        }
    }
    async getApplicationStats(tenderId) {
        try {
            const applications = await application_schema_1.Application.findAll({
                where: { tenderId },
                attributes: ['status'],
            });
            const stats = {
                total: applications.length,
                pending: applications.filter(app => app.status === 'pending').length,
                reviewed: applications.filter(app => app.status === 'reviewed').length,
                shortlisted: applications.filter(app => app.status === 'shortlisted').length,
                rejected: applications.filter(app => app.status === 'rejected').length,
                awarded: applications.filter(app => app.status === 'awarded').length,
            };
            return stats;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = new ApplicationService();
