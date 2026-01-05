import express from 'express';
import { 
  getFinancials, 
  upsertFinancialCategory, 
  updateFinancialDocument,
  deleteFinancialCategory, 
  deleteFinancialDocument 
} from '../controllers/FinancialController.js';

const router = express.Router();

// Public
router.get('/', getFinancials);

// CMS / Admin
router.post('/upsert', upsertFinancialCategory);
router.put('/category/:categoryId/document/:docId', updateFinancialDocument);
router.delete('/category/:id', deleteFinancialCategory);
router.delete('/category/:categoryId/document/:docId', deleteFinancialDocument);

export default router;