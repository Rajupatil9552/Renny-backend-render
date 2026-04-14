import express from 'express';
import { getAllTimelines, createTimeline, updateTimeline, deleteTimeline } from '../controllers/timelineController.js';

const router = express.Router();

router.get('/', getAllTimelines);
router.post('/', createTimeline);
router.put('/:id', updateTimeline);
router.delete('/:id', deleteTimeline);

export default router;
