
import express from 'express';
import multer from 'multer';
import path from 'path';
import { getCertificates, addCertificate, deleteCertificate,updateCertificate } from '../controllers/certificateController.js';

const router = express.Router();

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/certificates/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

router.get('/', getCertificates);
router.post('/', upload.single('image'), addCertificate);
router.put('/:id', upload.single('image'), updateCertificate);
router.delete('/:id', deleteCertificate);

export default router;