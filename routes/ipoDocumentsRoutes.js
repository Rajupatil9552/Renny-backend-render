import express from 'express';
import { 
  getIpoDocuments, 
  upsertIpoRecord, 
  deleteParticularIpoRecord 
} from '../controllers/ipoDocumentsController.js';

const router = express.Router();

// Public website route
router.get('/', getIpoDocuments);

// CMS management routes
router.post('/upsert', upsertIpoRecord);
router.delete('/record/:recordId', deleteParticularIpoRecord);

export default router;