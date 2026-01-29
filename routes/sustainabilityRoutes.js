import express from 'express';
import { submitReport, getReportLeads } from '../controllers/sustainabilityController.js';

const router = express.Router();

// Changed to /submit to match your frontend axios call
router.post('/submit', submitReport);

// Admin route
router.get('/admin/leads', getReportLeads);

export default router;