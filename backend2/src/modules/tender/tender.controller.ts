import { Request, Response } from 'express';
import TenderService from './tender.service';

// Extend Request interface to include user property
interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    [key: string]: any;
  };
}

class TenderController {
  constructor() {
    this.createTender = this.createTender.bind(this);
    this.getAllTenders = this.getAllTenders.bind(this);
    this.getTenderById = this.getTenderById.bind(this);
    this.getTendersByUserId = this.getTendersByUserId.bind(this);
    this.getMyTenders = this.getMyTenders.bind(this);
    this.updateTender = this.updateTender.bind(this);
    this.deleteTender = this.deleteTender.bind(this);
    this.getTendersByStatus = this.getTendersByStatus.bind(this);
    this.searchTenders = this.searchTenders.bind(this);
  }

  async createTender(req: AuthenticatedRequest, res: Response) {
    try {
      const {
        title,
        description,
        category,
        budget,
        deadline,
        location,
        requirements,
        submissionDeadline,
        contactEmail,
        contactPhone,
        attachments,
      } = req.body;

      // Get userId from the authenticated user (you'll need to implement authentication middleware)
      const userId = req.user?.id || 1; // Temporary fallback, replace with actual auth

      const tenderData = {
        userId,
        title,
        description,
        category,
        budget: parseFloat(budget),
        deadline: new Date(deadline),
        location,
        requirements,
        submissionDeadline: new Date(submissionDeadline),
        contactEmail,
        contactPhone,
        attachments,
      };

      const tender = await TenderService.createTender(tenderData);
      
      res.status(201).json({
        success: true,
        message: 'Tender created successfully',
        data: tender,
      });
    } catch (error) {
      console.error('Error creating tender:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create tender',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async getAllTenders(req: Request, res: Response) {
    try {
      const tenders = await TenderService.getAllTenders();
      
      res.status(200).json({
        success: true,
        data: tenders,
      });
    } catch (error) {
      console.error('Error fetching tenders:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch tenders',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async getTenderById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const tender = await TenderService.getTenderById(parseInt(id));
      
      if (!tender) {
        res.status(404).json({
          success: false,
          message: 'Tender not found',
        });
      }

      res.status(200).json({
        success: true,
        data: tender,
      });
    } catch (error) {
      console.error('Error fetching tender:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch tender',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async getTendersByUserId(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const tenders = await TenderService.getTendersByUserId(parseInt(userId));
      
      res.status(200).json({
        success: true,
        data: tenders,
      });
    } catch (error) {
      console.error('Error fetching user tenders:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch user tenders',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async getMyTenders(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'User not authenticated',
        });
        return;
      }

      const tenders = await TenderService.getTendersByUserId(userId);
      
      res.status(200).json({
        success: true,
        data: tenders,
      });
    } catch (error) {
      console.error('Error fetching my tenders:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch my tenders',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async updateTender(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      // Convert date strings to Date objects if they exist
      if (updateData.deadline) {
        updateData.deadline = new Date(updateData.deadline);
      }
      if (updateData.submissionDeadline) {
        updateData.submissionDeadline = new Date(updateData.submissionDeadline);
      }
      if (updateData.budget) {
        updateData.budget = parseFloat(updateData.budget);
      }

      const tender = await TenderService.updateTender(parseInt(id), updateData);
      
      res.status(200).json({
        success: true,
        message: 'Tender updated successfully',
        data: tender,
      });
    } catch (error) {
      console.error('Error updating tender:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update tender',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async deleteTender(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await TenderService.deleteTender(parseInt(id));
      
      res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      console.error('Error deleting tender:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete tender',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async getTendersByStatus(req: Request, res: Response) {
    try {
      const { status } = req.params;
      const tenders = await TenderService.getTendersByStatus(status as any);
      
      res.status(200).json({
        success: true,
        data: tenders,
      });
    } catch (error) {
      console.error('Error fetching tenders by status:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch tenders by status',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async searchTenders(req: Request, res: Response) {
    try {
      const { q } = req.query;
      
      if (!q || typeof q !== 'string') {
         res.status(400).json({
          success: false,
          message: 'Search query is required',
        });
      }

      const tenders = await TenderService.searchTenders(q as string);
      
      res.status(200).json({
        success: true,
        data: tenders,
      });
    } catch (error) {
      console.error('Error searching tenders:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to search tenders',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
}

export default new TenderController();
