import { getTenderModel } from './tender.schema';

interface CreateTenderPayload {
  userId: number;
  title: string;
  description: string;
  category: string;
  budget: number;
  deadline: Date;
  location: string;
  requirements: string;
  submissionDeadline: Date;
  contactEmail: string;
  contactPhone: string;
  attachments?: string;
}

interface UpdateTenderPayload {
  title?: string;
  description?: string;
  category?: string;
  budget?: number;
  deadline?: Date;
  location?: string;
  requirements?: string;
  status?: 'open' | 'in_progress' | 'awarded' | 'closed';
  submissionDeadline?: Date;
  contactEmail?: string;
  contactPhone?: string;
  attachments?: string;
}

class TenderService {
  async createTender(payload: CreateTenderPayload) {
    const Tender = getTenderModel();
    const tender = await Tender.create(payload);
    return tender.get();
  }

  async getAllTenders() {
    const Tender = getTenderModel();
    const { getUserModel } = require('../auth/auth.schema');
    const User = getUserModel();
    
    const tenders = await Tender.findAll({
      order: [['createdAt', 'DESC']],
    });
    
    // Fetch user data for each tender
    const tendersWithUsers = await Promise.all(
      tenders.map(async (tender: any) => {
        const tenderData = tender.get();
        try {
          const user = await User.findByPk(tenderData.userId);
          return {
            ...tenderData,
            user: user ? user.get() : null,
          };
        } catch (error) {
          console.error('Error fetching user for tender:', error);
          return {
            ...tenderData,
            user: null,
          };
        }
      })
    );
    
    return tendersWithUsers;
  }

  async getTenderById(id: number) {
    const Tender = getTenderModel();
    const tender = await Tender.findByPk(id);
    if (!tender) return null;
    return tender.get();
  }

  async getTendersByUserId(userId: number) {
    const Tender = getTenderModel();
    const tenders = await Tender.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
    });
    return tenders.map((tender: any) => tender.get());
  }

  async updateTender(id: number, payload: UpdateTenderPayload) {
    const Tender = getTenderModel();
    const tender = await Tender.findByPk(id);
    if (!tender) {
      throw new Error('Tender not found');
    }

    await tender.update(payload);
    return tender.get();
  }

  async deleteTender(id: number) {
    const Tender = getTenderModel();
    const tender = await Tender.findByPk(id);
    if (!tender) {
      throw new Error('Tender not found');
    }

    await tender.destroy();
    return { message: 'Tender deleted successfully' };
  }

  async getTendersByStatus(status: 'open' | 'in_progress' | 'awarded' | 'closed') {
    const Tender = getTenderModel();
    const tenders = await Tender.findAll({
      where: { status },
      order: [['createdAt', 'DESC']],
    });
    return tenders.map((tender: any) => tender.get());
  }

  async searchTenders(query: string) {
    const Tender = getTenderModel();
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
    
    return tenders.map((tender: any) => tender.get());
  }
}

export default new TenderService();
