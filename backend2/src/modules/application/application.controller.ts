import { Request, Response } from 'express';
import ApplicationService from './application.service';

class ApplicationController {
  async createApplication(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user.id;
      const { tenderId } = req.body;

      if (!tenderId) {
        res.status(400).json({ 
          success: false,
          message: 'Tender ID is required' 
        });
        return;
      }

      const application = await ApplicationService.createApplication(userId, tenderId);
      res.status(201).json({ 
        success: true,
        message: 'Application submitted successfully',
        data: application 
      });
    } catch (error) {
      console.error('Create application error:', error);
      if (error instanceof Error && error.message === 'Application already exists for this tender') {
        res.status(400).json({ 
          success: false,
          message: 'You have already applied for this tender' 
        });
      } else {
        res.status(500).json({ 
          success: false,
          message: 'Internal Server Error' 
        });
      }
    }
  }

  async updateApplication(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user.id;
      const { tenderId, status } = req.body;

      if (!tenderId || !status) {
        res.status(400).json({ 
          success: false,
          message: 'Tender ID and status are required' 
        });
        return;
      }

      const application = await ApplicationService.updateApplication(userId, tenderId, { status });
      res.json({ 
        success: true,
        message: 'Application updated successfully',
        data: application 
      });
    } catch (error) {
      console.error('Update application error:', error);
      if (error instanceof Error && error.message === 'Application not found') {
        res.status(404).json({ 
          success: false,
          message: 'Application not found' 
        });
      } else {
        res.status(500).json({ 
          success: false,
          message: 'Internal Server Error' 
        });
      }
    }
  }

  async getMyApplications(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user.id;
      const applications = await ApplicationService.getApplicationByUserId(userId);

      res.json({ 
        success: true,
        data: applications 
      });
    } catch (error) {
      console.error('Get applications error:', error);
      res.status(500).json({ 
        success: false,
        message: 'Internal Server Error' 
      });
    }
  }

  async getApplicationsByTender(req: Request, res: Response): Promise<void> {
    try {
      const { tenderId } = req.params;
      const applications = await ApplicationService.getApplicationByTenderId(parseInt(tenderId));

      res.json({ 
        success: true,
        data: applications 
      });
    } catch (error) {
      console.error('Get applications by tender error:', error);
      res.status(500).json({ 
        success: false,
        message: 'Internal Server Error' 
      });
    }
  }

  async getApplicationWithUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user.id;
      const result = await ApplicationService.getApplicationWithUser(userId);

      if (!result) {
        res.status(404).json({ 
          success: false,
          message: 'User not found' 
        });
      } else {
        res.json({ 
          success: true,
          data: result 
        });
      }
    } catch (error) {
      console.error('Get application with user error:', error);
      res.status(500).json({ 
        success: false,
        message: 'Internal Server Error' 
      });
    }
  }
}

export default new ApplicationController(); 