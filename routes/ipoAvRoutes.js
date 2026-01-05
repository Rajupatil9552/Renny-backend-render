import express from 'express';
import { 
  getIpoVideos, 
  upsertIpoVideo, 
  deleteParticularVideo 
} from '../controllers/ipoAvController.js';

const router = express.Router();

// Public website endpoint
router.get('/', getIpoVideos);

// CMS management endpoints
router.post('/upsert', upsertIpoVideo);
router.delete('/video/:videoId', deleteParticularVideo);

export default router;