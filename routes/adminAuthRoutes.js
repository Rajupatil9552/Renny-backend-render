import express from 'express';
import { registerAdmin, loginAdmin, getAdmins, updateAdminRole, deleteAdmin } from '../controllers/adminAuthController.js';
import { protectAdmin, authorizeRoles } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);

// Admins management
router.get('/admins', protectAdmin, authorizeRoles('superadmin'), getAdmins);
router.put('/admins/:id', protectAdmin, authorizeRoles('superadmin'), updateAdminRole);
router.delete('/admins/:id', protectAdmin, authorizeRoles('superadmin'), deleteAdmin);

export default router;
