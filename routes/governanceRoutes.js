import express from 'express';
import { 
  getGovernanceData, 
  upsertGovernanceRecord, 
  deleteParticularGovernanceItem 
} from '../controllers/governanceController.js';

const router = express.Router();

router.get('/', getGovernanceData);
router.post('/upsert', upsertGovernanceRecord);
router.delete('/:slug/item/:itemId', deleteParticularGovernanceItem);

export default router;