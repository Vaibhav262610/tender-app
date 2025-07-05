"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tender_schema_1 = require("./tender.schema");
class TenderService {
    async createTender(payload) {
        const Tender = (0, tender_schema_1.getTenderModel)();
        const tender = await Tender.create(payload);
        return tender.get();
    }
    async getAllTenders() {
        const Tender = (0, tender_schema_1.getTenderModel)();
        const { getUserModel } = require('../auth/auth.schema');
        const User = getUserModel();
        const tenders = await Tender.findAll({
            order: [['createdAt', 'DESC']],
        });
        // Fetch user data for each tender
        const tendersWithUsers = await Promise.all(tenders.map(async (tender) => {
            const tenderData = tender.get();
            try {
                const user = await User.findByPk(tenderData.userId);
                return {
                    ...tenderData,
                    user: user ? user.get() : null,
                };
            }
            catch (error) {
                console.error('Error fetching user for tender:', error);
                return {
                    ...tenderData,
                    user: null,
                };
            }
        }));
        return tendersWithUsers;
    }
    async getTenderById(id) {
        const Tender = (0, tender_schema_1.getTenderModel)();
        const tender = await Tender.findByPk(id);
        if (!tender)
            return null;
        return tender.get();
    }
    async getTendersByUserId(userId) {
        const Tender = (0, tender_schema_1.getTenderModel)();
        const tenders = await Tender.findAll({
            where: { userId },
            order: [['createdAt', 'DESC']],
        });
        return tenders.map((tender) => tender.get());
    }
    async updateTender(id, payload) {
        const Tender = (0, tender_schema_1.getTenderModel)();
        const tender = await Tender.findByPk(id);
        if (!tender) {
            throw new Error('Tender not found');
        }
        await tender.update(payload);
        return tender.get();
    }
    async deleteTender(id) {
        const Tender = (0, tender_schema_1.getTenderModel)();
        const tender = await Tender.findByPk(id);
        if (!tender) {
            throw new Error('Tender not found');
        }
        await tender.destroy();
        return { message: 'Tender deleted successfully' };
    }
    async getTendersByStatus(status) {
        const Tender = (0, tender_schema_1.getTenderModel)();
        const tenders = await Tender.findAll({
            where: { status },
            order: [['createdAt', 'DESC']],
        });
        return tenders.map((tender) => tender.get());
    }
    async searchTenders(query) {
        const Tender = (0, tender_schema_1.getTenderModel)();
        const { Op } = require('sequelize');
        const tenders = await Tender.findAll({
            where: {
                [Op.or]: [
                    { title: { [Op.iLike]: `%${query}%` } },
                    { description: { [Op.iLike]: `%${query}%` } },
                    { category: { [Op.iLike]: `%${query}%` } },
                    { location: { [Op.iLike]: `%${query}%` } },
                ],
            },
            order: [['createdAt', 'DESC']],
        });
        return tenders.map((tender) => tender.get());
    }
}
exports.default = new TenderService();
