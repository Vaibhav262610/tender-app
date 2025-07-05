"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../modules/auth/auth.controller"));
const company_controller_1 = __importDefault(require("../modules/company/company.controller"));
const tender_controller_1 = __importDefault(require("../modules/tender/tender.controller"));
const auth_middleware_1 = require("../modules/auth/auth.middleware");
const application_controller_1 = __importDefault(require("../modules/application/application.controller"));
const router = (0, express_1.Router)();
// Auth routes
router.post('/auth/login', auth_controller_1.default.login);
router.post('/auth/register', auth_controller_1.default.register);
router.get('/auth/profile', auth_middleware_1.verifyToken, auth_controller_1.default.getProfile);
// Company routes
router.post('/company', auth_middleware_1.verifyToken, company_controller_1.default.createCompany);
router.put('/company', auth_middleware_1.verifyToken, company_controller_1.default.updateCompany);
router.get('/company', auth_middleware_1.verifyToken, company_controller_1.default.getCompany);
router.get('/profile/complete', auth_middleware_1.verifyToken, company_controller_1.default.getCompanyWithUser);
// Application routes
router.post('/application', auth_middleware_1.verifyToken, application_controller_1.default.createApplication);
router.put('/application', auth_middleware_1.verifyToken, application_controller_1.default.updateApplication);
router.get('/application', auth_middleware_1.verifyToken, application_controller_1.default.getApplication);
router.get('/application/my', auth_middleware_1.verifyToken, application_controller_1.default.getApplicationWithUser);
// Tender routes
router.post('/tenders', auth_middleware_1.verifyToken, tender_controller_1.default.createTender);
router.get('/tenders', tender_controller_1.default.getAllTenders);
router.get('/tenders/search', tender_controller_1.default.searchTenders);
router.get('/tenders/status/:status', tender_controller_1.default.getTendersByStatus);
router.get('/tenders/user/:userId', tender_controller_1.default.getTendersByUserId);
router.get('/tenders/my', auth_middleware_1.verifyToken, tender_controller_1.default.getMyTenders);
router.get('/tenders/:id', tender_controller_1.default.getTenderById);
router.put('/tenders/:id', auth_middleware_1.verifyToken, tender_controller_1.default.updateTender);
router.delete('/tenders/:id', auth_middleware_1.verifyToken, tender_controller_1.default.deleteTender);
exports.default = router;
