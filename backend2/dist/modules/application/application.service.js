"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const application_schema_1 = require("./application.schema");
const dbConnection_1 = require("../../db/dbConnection");
class ApplicationService {
    async createApplication(userId, payload) {
        const Application = (0, application_schema_1.getApplicationModel)();
        // Check if company already exists for this user
        const existingApplication = await Application.findOne({ where: { userId } });
        if (existingApplication) {
            throw new Error('Application already exists');
        }
        const application = await Application.create({
            // userId,
            ...payload,
        });
        return application.get();
    }
    async updateApplication(userId, payload) {
        const Application = (0, application_schema_1.getApplicationModel)();
        const application = await Application.findOne({ where: { userId } });
        if (!application) {
            throw new Error('Application not found');
        }
        await application.update(payload);
        return application.get();
    }
    async getApplicationByUserId(userId) {
        const Application = (0, application_schema_1.getApplicationModel)();
        const application = await Application.findOne({ where: { userId } });
        if (!application)
            return null;
        return application.get();
    }
    async getApplicationWithUser(userId) {
        const User = dbConnection_1.sequelize.models.User;
        const user = await User.findByPk(userId);
        if (!user)
            return null;
        const Application = (0, application_schema_1.getApplicationModel)();
        const application = await Application.findOne({ where: { userId } });
        return {
            user: user.get(),
            application: application ? application.get() : null,
        };
    }
}
exports.default = new ApplicationService();
