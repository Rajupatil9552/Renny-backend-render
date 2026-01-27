import express from 'express';
import { 
  getCertificates, 
  upsertCertificate, 
  deleteCertificate 
} from '../controllers/certificateController.js';

const router = express.Router();

// [READ] - Get all certificates
router.get('/', getCertificates);
// [CREATE or UPDATE] - Upsert certificate record
router.post('/upsert', upsertCertificate);

// [DELETE] - Remove certificate record
router.delete('/:id', deleteCertificate);

export default router;