
import express from 'express';
import { submitReport, getReportLeads } from '../controllers/sustainabilityController.js';

const router = express.Router();

// Public route for the sustainability page form
router.post('/submit-report', submitReport);

// Admin route to view all submissions in the panel
router.get('/admin/leads', getReportLeads);

export default router;