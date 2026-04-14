import express from 'express';
import {
  getProductContentBySlug,
  getAllProductContents,
  upsertProductContent,
  deleteProductContent
} from '../controllers/ProductContentController.js';

const router = express.Router();

// Public route to fetch content for frontend pages
router.get('/:slug', getProductContentBySlug);

// Generic CMS routes (if needed to list all)
router.get('/', getAllProductContents);

// CMS route to update or create
router.put('/:slug', upsertProductContent);
router.delete('/:slug', deleteProductContent);

export default router;
