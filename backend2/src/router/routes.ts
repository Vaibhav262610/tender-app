import { Router } from 'express';
import AuthController from '../modules/auth/auth.controller';
import CompanyController from '../modules/company/company.controller';
import TenderController from '../modules/tender/tender.controller';
import ApplicationController from '../modules/application/application.controller';
import { verifyToken } from '../modules/auth/auth.middleware';

const router = Router();

// Auth routes
router.post('/auth/login', AuthController.login);
router.post('/auth/register', AuthController.register);
router.get('/auth/profile', verifyToken, AuthController.getProfile);

// Company routes
router.post('/company', verifyToken, CompanyController.createCompany);
router.put('/company', verifyToken, CompanyController.updateCompany);
router.put('/company/logo', verifyToken, CompanyController.updateCompanyLogo);
router.get('/company', verifyToken, CompanyController.getCompany);
router.get('/companies', CompanyController.getAllCompanies);
router.get('/companies/:id', CompanyController.getCompanyById);
router.get('/profile/complete', verifyToken, CompanyController.getCompanyWithUser);


// Tender routes
router.post('/tenders', verifyToken, TenderController.createTender);
router.get('/tenders', TenderController.getAllTenders);
router.get('/tenders/my', verifyToken, TenderController.getMyTenders);

// Application routes
router.post('/application', verifyToken, ApplicationController.createApplication);
router.put('/application', verifyToken, ApplicationController.updateApplication);
router.get('/application/my', verifyToken, ApplicationController.getMyApplications);
router.get('/application/tender/:tenderId', verifyToken, ApplicationController.getApplicationsByTender);
router.get('/application/with-user', verifyToken, ApplicationController.getApplicationWithUser);

export default router;
