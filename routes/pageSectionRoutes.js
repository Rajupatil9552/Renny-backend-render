import express from 'express';
import { getPageSections, upsertPageSection } from '../controllers/pageSectionController.js';

const router = express.Router();

router.get('/:pageName', getPageSections);
router.put('/:pageName/:sectionName', upsertPageSection);

export default router;
