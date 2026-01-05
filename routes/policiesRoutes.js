import express from 'express';
import { 
  getAllPolicies, 
  upsertPolicy, 
  deletePolicy 
} from '../controllers/policiesController.js';

const router = express.Router();

// Public website endpoint
router.get('/', getAllPolicies);

// CMS management endpoints
router.post('/upsert', upsertPolicy);
router.delete('/:id', deletePolicy);

export default router;