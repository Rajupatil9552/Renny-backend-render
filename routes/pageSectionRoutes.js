import express from 'express';
import { getPageSections, upsertPageSection, deletePageSection } from '../controllers/pageSectionController.js';

const router = express.Router();

router.get('/:pageName', getPageSections);
router.put('/:pageName/:sectionName', upsertPageSection);
router.delete('/:pageName/:sectionName', deletePageSection);

export default router;
