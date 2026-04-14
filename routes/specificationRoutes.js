import express from 'express';
import { getAllSpecifications, createSpecification, updateSpecification, deleteSpecification } from '../controllers/specificationController.js';

const router = express.Router();

router.get('/', getAllSpecifications);
router.post('/', createSpecification);
router.put('/:id', updateSpecification);
router.delete('/:id', deleteSpecification);

export default router;
