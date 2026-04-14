import express from 'express';
import { getDesignCentre, updateDesignCentre } from '../controllers/designCentreController.js';
import { protectAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getDesignCentre);
router.post('/', protectAdmin, updateDesignCentre);

export default router;
