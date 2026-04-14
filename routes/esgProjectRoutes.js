import express from 'express';
import { getAllEsgProjects, createEsgProject, updateEsgProject, deleteEsgProject } from '../controllers/esgProjectController.js';

const router = express.Router();

router.get('/', getAllEsgProjects);
router.post('/', createEsgProject);
router.put('/:id', updateEsgProject);
router.delete('/:id', deleteEsgProject);

export default router;
