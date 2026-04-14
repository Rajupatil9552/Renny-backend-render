import express from 'express';
import { getAllSuccessStories, createSuccessStory, updateSuccessStory, deleteSuccessStory } from '../controllers/successStoryController.js';

const router = express.Router();

router.get('/', getAllSuccessStories);
router.post('/', createSuccessStory);
router.put('/:id', updateSuccessStory);
router.delete('/:id', deleteSuccessStory);

export default router;
