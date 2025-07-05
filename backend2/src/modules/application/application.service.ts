import { getApplicationModel } from './application.schema';
import { sequelize } from '../../db/dbConnection';

interface ApplicationPayload {
  tenderId: number;
  userId: number;
  status?: string;
}

class ApplicationService {
  async createApplication(userId: number, tenderId: number) {
    const Application = getApplicationModel();
    
    // Check if application already exists for this user and tender
    const existingApplication = await Application.findOne({ 
      where: { userId, tenderId } 
    });
    
    if (existingApplication) {
      throw new Error('Application already exists for this tender');
    }

    const application = await Application.create({
      userId,
      tenderId,
      status: 'pending',
    });

    return application.get();
  }

  async updateApplication(userId: number, tenderId: number, payload: Partial<ApplicationPayload>) {
    const Application = getApplicationModel();
    const application = await Application.findOne({ 
      where: { userId, tenderId } 
    });
    
    if (!application) {
      throw new Error('Application not found');
    }

    await application.update(payload);
    return application.get();
  }

  async getApplicationByUserId(userId: number) {
    const Application = getApplicationModel();
    const applications = await Application.findAll({ 
      where: { userId },
      include: [
        {
          model: sequelize.models.Tender,
          as: 'tender',
          attributes: ['id', 'title', 'description', 'budget', 'deadline', 'status']
        }
      ]
    });
    
    return applications.map((app: any) => app.get());
  }

  async getApplicationByTenderId(tenderId: number) {
    const Application = getApplicationModel();
    const applications = await Application.findAll({ 
      where: { tenderId },
      include: [
        {
          model: sequelize.models.User,
          as: 'user',
          attributes: ['id', 'firstname', 'lastname', 'email']
        }
      ]
    });
    
    return applications.map((app: any) => app.get());
  }

  async getApplicationWithUser(userId: number) {
    const User = sequelize.models.User;
    const user = await User.findByPk(userId);
    if (!user) return null;

    const Application = getApplicationModel();
    const applications = await Application.findAll({ 
      where: { userId },
      include: [
        {
          model: sequelize.models.Tender,
          as: 'tender',
          attributes: ['id', 'title', 'description', 'budget', 'deadline', 'status']
        }
      ]
    });
    
    return {
      user: user.get(),
      applications: applications.map((app: any) => app.get()),
    };
  }
}

export default new ApplicationService(); 