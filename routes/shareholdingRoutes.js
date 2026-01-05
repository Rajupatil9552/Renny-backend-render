import express from 'express';
import { 
  getShareholdingPatterns, 
  upsertShareholdingRecord, 
  deleteParticularShareholdingRecord 
} from '../controllers/shareholdingController.js';

const router = express.Router();

// Public website endpoint
router.get('/', getShareholdingPatterns);

// CMS management endpoints
router.post('/upsert', upsertShareholdingRecord);
router.delete('/record/:recordId', deleteParticularShareholdingRecord);

export default router;