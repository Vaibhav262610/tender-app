import { getCompanyModel } from './company.schema';
import { sequelize } from '../../db/dbConnection';

interface CompanyPayload {
  logoUrl?: string;
  industry: string;
  aboutCompany: string;
  foundedYear?: string;
  companySize?: string;
  companyLocation: string;
  companyWebsite?: string;
  contactEmail?: string;
  contactNumber?: string;
  productsOrServices?: string;
}

class CompanyService {
  async createCompany(userId: number, payload: CompanyPayload) {
    const Company = getCompanyModel();
    // Check if company already exists for this user
    const existingCompany = await Company.findOne({ where: { userId } });
    if (existingCompany) {
      throw new Error('Company already exists');
    }

    const company = await Company.create({
      userId,
      ...payload,
    });

    return company.get();
  }

  async updateCompany(userId: number, payload: CompanyPayload) {
    const Company = getCompanyModel();
    const company = await Company.findOne({ where: { userId } });
    if (!company) {
      throw new Error('Company not found');
    }

    await company.update(payload);
    return company.get();
  }

  async getCompanyByUserId(userId: number) {
    const Company = getCompanyModel();
    const company = await Company.findOne({ where: { userId } });
    if (!company) return null;
    return company.get();
  }

  async getCompanyWithUser(userId: number) {
    const User = sequelize.models.User;
    const user = await User.findByPk(userId);
    if (!user) return null;

    const Company = getCompanyModel();
    const company = await Company.findOne({ where: { userId } });
    
    return {
      user: user.get(),
      company: company ? company.get() : null,
    };
  }

  async getAllCompanies() {
    const Company = getCompanyModel();
    const User = sequelize.models.User;
    
    try {
      const companies = await Company.findAll({
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id', 'firstname', 'lastname', 'email', 'jobtitle', 'companyname']
          }
        ],
        order: [['createdAt', 'DESC']]
      });

      return companies.map((company: any) => company.get());
    } catch (error) {
      console.error('Error in getAllCompanies:', error);
      
      // Fallback: get companies without user data
      const companies = await Company.findAll({
        order: [['createdAt', 'DESC']]
      });

      return companies.map((company: any) => company.get());
    }
  }

  async getCompanyById(companyId: number) {
    const Company = getCompanyModel();
    const User = sequelize.models.User;
    
    try {
      const company = await Company.findByPk(companyId, {
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id', 'firstname', 'lastname', 'email', 'jobtitle', 'companyname']
          }
        ]
      });

      if (!company) return null;
      return company.get();
    } catch (error) {
      console.error('Error in getCompanyById:', error);
      
      // Fallback: get company without user data
      const company = await Company.findByPk(companyId);
      if (!company) return null;
      return company.get();
    }
  }

  async updateCompanyLogo(userId: number, logoUrl: string) {
    const Company = getCompanyModel();
    const company = await Company.findOne({ where: { userId } });
    if (!company) {
      throw new Error('Company not found');
    }

    await company.update({ logoUrl });
    return company.get();
  }
}

export default new CompanyService(); 