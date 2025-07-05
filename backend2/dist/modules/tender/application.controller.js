"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const application_service_1 = __importDefault(require("./application.service"));
class ApplicationController {
    constructor() {
        this.createApplication = this.createApplication.bind(this);
        this.getApplicationById = this.getApplicationById.bind(this);
        this.getApplicationsByTenderId = this.getApplicationsByTenderId.bind(this);
        this.getMyApplications = this.getMyApplications.bind(this);
        this.updateApplicationStatus = this.updateApplicationStatus.bind(this);
        this.deleteApplication = this.deleteApplication.bind(this);
        this.getApplicationStats = this.getApplicationStats.bind(this);
    }
    async createApplication(req, res) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                res.status(401).json({
                    success: false,
                    message: 'User not authenticated',
                });
                return;
            }
            const { tenderId, companyName, contactPerson, email, phone, address, city, state, country, zipCode, website, companySize, yearsInBusiness, relevantExperience, proposedSolution, timeline, budget, teamSize, technicalApproach, riskMitigation, qualityAssurance, references, certifications, financialDocuments, portfolio, additionalInfo, } = req.body;
            const applicationData = {
                tenderId: parseInt(tenderId),
                userId,
                companyName,
                contactPerson,
                email,
                phone,
                address,
                city,
                state,
                country,
                zipCode,
                website,
                companySize,
                yearsInBusiness,
                relevantExperience,
                proposedSolution,
                timeline,
                budget: parseFloat(budget),
                teamSize: parseInt(teamSize),
                technicalApproach,
                riskMitigation,
                qualityAssurance,
                references,
                certifications,
                financialDocuments,
                portfolio,
                additionalInfo,
                status: 'pending',
            };
            const application = await application_service_1.default.createApplication(applicationData);
            res.status(201).json({
                success: true,
                message: 'Application submitted successfully',
                data: application,
            });
        }
        catch (error) {
            console.error('Error creating application:', error);
            res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to submit application',
            });
        }
    }
    async getApplicationById(req, res) {
        try {
            const { id } = req.params;
            const application = await application_service_1.default.getApplicationById(parseInt(id));
            if (!application) {
                res.status(404).json({
                    success: false,
                    message: 'Application not found',
                });
                return;
            }
            res.status(200).json({
                success: true,
                data: application,
            });
        }
        catch (error) {
            console.error('Error fetching application:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to fetch application',
                error: error instanceof Error ? error.message : 'Unknown error',
            });
        }
    }
    async getApplicationsByTenderId(req, res) {
        try {
            const { tenderId } = req.params;
            const applications = await application_service_1.default.getApplicationsByTenderId(parseInt(tenderId));
            res.status(200).json({
                success: true,
                data: applications,
            });
        }
        catch (error) {
            console.error('Error fetching applications:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to fetch applications',
                error: error instanceof Error ? error.message : 'Unknown error',
            });
        }
    }
    async getMyApplications(req, res) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                res.status(401).json({
                    success: false,
                    message: 'User not authenticated',
                });
                return;
            }
            const applications = await application_service_1.default.getApplicationsByUserId(userId);
            res.status(200).json({
                success: true,
                data: applications,
            });
        }
        catch (error) {
            console.error('Error fetching my applications:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to fetch my applications',
                error: error instanceof Error ? error.message : 'Unknown error',
            });
        }
    }
    async updateApplicationStatus(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;
            if (!status) {
                res.status(400).json({
                    success: false,
                    message: 'Status is required',
                });
                return;
            }
            const application = await application_service_1.default.updateApplicationStatus(parseInt(id), status);
            res.status(200).json({
                success: true,
                message: 'Application status updated successfully',
                data: application,
            });
        }
        catch (error) {
            console.error('Error updating application status:', error);
            res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to update application status',
            });
        }
    }
    async deleteApplication(req, res) {
        try {
            const { id } = req.params;
            const userId = req.user?.id;
            if (!userId) {
                res.status(401).json({
                    success: false,
                    message: 'User not authenticated',
                });
                return;
            }
            // Check if the application belongs to the user
            const application = await application_service_1.default.getApplicationById(parseInt(id));
            if (!application) {
                res.status(404).json({
                    success: false,
                    message: 'Application not found',
                });
                return;
            }
            if (application.userId !== userId) {
                res.status(403).json({
                    success: false,
                    message: 'You can only delete your own applications',
                });
                return;
            }
            await application_service_1.default.deleteApplication(parseInt(id));
            res.status(200).json({
                success: true,
                message: 'Application deleted successfully',
            });
        }
        catch (error) {
            console.error('Error deleting application:', error);
            res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to delete application',
            });
        }
    }
    async getApplicationStats(req, res) {
        try {
            const { tenderId } = req.params;
            const stats = await application_service_1.default.getApplicationStats(parseInt(tenderId));
            res.status(200).json({
                success: true,
                data: stats,
            });
        }
        catch (error) {
            console.error('Error fetching application stats:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to fetch application stats',
                error: error instanceof Error ? error.message : 'Unknown error',
            });
        }
    }
}
exports.default = new ApplicationController();
