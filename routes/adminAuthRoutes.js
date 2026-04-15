import express from 'express';
import { registerAdmin, loginAdmin, getAdmins, createAdmin, updateAdminRole, deleteAdmin, changePassword } from '../controllers/adminAuthController.js';
import { protectAdmin, authorizeRoles } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);

// Password management
router.post('/change-password', protectAdmin, changePassword);

// Admins management
router.post('/admins', protectAdmin, authorizeRoles('superadmin'), createAdmin);
router.get('/admins', protectAdmin, authorizeRoles('superadmin'), getAdmins);
router.put('/admins/:id', protectAdmin, authorizeRoles('superadmin'), updateAdminRole);
router.delete('/admins/:id', protectAdmin, authorizeRoles('superadmin'), deleteAdmin);

export default router;
