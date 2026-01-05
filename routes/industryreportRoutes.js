import express from 'express';
import { 
  getIndustryReports, 
  upsertIndustryReport, 
  deleteParticularReport
} from '../controllers/industryreportController.js';

const router = express.Router();

// Public
router.get('/', getIndustryReports);

// CMS
router.post('/upsert', upsertIndustryReport);
router.delete('/record/:reportId', deleteParticularReport);


export default router;