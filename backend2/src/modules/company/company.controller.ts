import { Request, Response } from 'express';
import CompanyService from './company.service';

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

class CompanyController {
    async createCompany(req: Request, res: Response) {
    try {
      const userId = (req as any).user.id;
      const payload: CompanyPayload = req.body;

      const company = await CompanyService.createCompany(userId, payload);
      res.status(201).json({ msg: 'Company created successfully', company });
    } catch (error) {
      console.error('Create company error:', error);
      if (error instanceof Error && error.message === 'Company already exists') {
        res.status(400).json({ msg: 'Company already exists for this user' });
      } else {
        res.status(500).json({ msg: 'Internal Server Error' });
      }
    }
  }

  async updateCompany(req: Request, res: Response) {
    try {
      const userId = (req as any).user.id;
      const payload: CompanyPayload = req.body;

      const company = await CompanyService.updateCompany(userId, payload);
       res.json({ msg: 'Company updated successfully', company });
    } catch (error) {
      console.error('Update company error:', error);
      if (error instanceof Error && error.message === 'Company not found') {
         res.status(404).json({ msg: 'Company not found' });
      }
       res.status(500).json({ msg: 'Internal Server Error' });
    }
  }

  async getCompany(req: Request, res: Response) {
    try {
      const userId = (req as any).user.id;
      const company = await CompanyService.getCompanyByUserId(userId);

      if (!company) {
         res.status(404).json({ msg: 'Company not found' });
      }

       res.json({ company });
    } catch (error) {
      console.error('Get company error:', error);
       res.status(500).json({ msg: 'Internal Server Error' });
    }
  }

    async getCompanyWithUser(req: Request, res: Response) {
    try {
      const userId = (req as any).user.id;
      const result = await CompanyService.getCompanyWithUser(userId);

      if (!result) {
        res.status(404).json({ msg: 'User or company not found' });
      } else {
        res.json({ user: result.user, company: result.company });
      }
    } catch (error) {
      console.error('Get company with user error:', error);
      res.status(500).json({ msg: 'Internal Server Error' });
    }
  }

  async updateCompanyLogo(req: Request, res: Response) {
    try {
      const userId = (req as any).user.id;
      const { logoUrl } = req.body;

      if (!logoUrl) {
        res.status(400).json({ msg: 'Logo URL is required' });
        return;
      }

      const company = await CompanyService.updateCompanyLogo(userId, logoUrl);
      res.json({ msg: 'Company logo updated successfully', company });
    } catch (error) {
      console.error('Update company logo error:', error);
      if (error instanceof Error && error.message === 'Company not found') {
        res.status(404).json({ msg: 'Company not found' });
      } else {
        res.status(500).json({ msg: 'Internal Server Error' });
      }
    }
  }

  async getAllCompanies(req: Request, res: Response) {
    try {
      const companies = await CompanyService.getAllCompanies();
      res.json({ companies });
    } catch (error) {
      console.error('Get all companies error:', error);
      res.status(500).json({ msg: 'Internal Server Error' });
    }
  }

  async getCompanyById(req: Request, res: Response) {
    try {
      const companyId = parseInt(req.params.id);
      
      if (isNaN(companyId)) {
        res.status(400).json({ msg: 'Invalid company ID' });
        return;
      }

      const company = await CompanyService.getCompanyById(companyId);
      
      if (!company) {
        res.status(404).json({ msg: 'Company not found' });
        return;
      }

      res.json({ company });
    } catch (error) {
      console.error('Get company by ID error:', error);
      res.status(500).json({ msg: 'Internal Server Error' });
    }
  }
}

export default new CompanyController(); 