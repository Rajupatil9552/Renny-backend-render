import Admin from '../models/AdminModel.js';
import jwt from 'jsonwebtoken';

// Generate Token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || 'supersecretkey', {
    expiresIn: '7d',
  });
};

// @desc    Register a new admin (initial setup)
// @route   POST /cms/auth/register
export const registerAdmin = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingAdminCount = await Admin.countDocuments();

    if (existingAdminCount > 0) {
      return res.status(403).json({
        message: 'Public admin registration is disabled. Ask a superadmin to create your account.',
      });
    }

    const adminExists = await Admin.findOne({ email });

    if (adminExists) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const admin = await Admin.create({
      name,
      email,
      password,
      role: 'superadmin',
      mustChangePassword: false,
    });

    if (admin) {
      res.status(201).json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        isActive: admin.isActive,
        mustChangePassword: admin.mustChangePassword,
        token: generateToken(admin._id, admin.role),
      });
    } else {
      res.status(400).json({ message: 'Invalid admin data' });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Auth admin & get token
// @route   POST /cms/auth/login
export const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (!admin.isActive) {
      return res.status(403).json({ message: 'Your admin account is inactive. Please contact a superadmin.' });
    }

    if (await admin.matchPassword(password)) {
      admin.lastLoginAt = new Date();
      await admin.save();

      res.json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        isActive: admin.isActive,
        mustChangePassword: admin.mustChangePassword,
        token: generateToken(admin._id, admin.role),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get all admins
// @route   GET /cms/auth/admins
export const getAdmins = async (req, res, next) => {
  try {
    const admins = await Admin.find({})
      .select('-password')
      .populate('createdBy', 'name email role');
    res.json(admins);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new admin from CMS
// @route   POST /cms/auth/admins
export const createAdmin = async (req, res, next) => {
  try {
    const { name, email, password, role, isActive, mustChangePassword } = req.body;

    const adminExists = await Admin.findOne({ email });

    if (adminExists) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const admin = await Admin.create({
      name,
      email,
      password,
      role: role || 'admin',
      isActive: typeof isActive === 'boolean' ? isActive : true,
      mustChangePassword: typeof mustChangePassword === 'boolean' ? mustChangePassword : true,
      createdBy: req.admin._id,
    });

    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      isActive: admin.isActive,
      mustChangePassword: admin.mustChangePassword,
      createdBy: admin.createdBy,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update admin role
// @route   PUT /cms/auth/admins/:id
export const updateAdminRole = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.params.id);

    if (admin) {
      const { role, isActive, mustChangePassword, name } = req.body;
      const nextRole = role || admin.role;
      const isSelf = req.params.id === req.admin._id.toString();
      const superadminCount = await Admin.countDocuments({ role: 'superadmin' });

      if (
        admin.role === 'superadmin' &&
        nextRole !== 'superadmin' &&
        isSelf &&
        req.admin.role === 'superadmin' &&
        superadminCount === 1
      ) {
        return res.status(400).json({ message: 'At least one superadmin must remain assigned.' });
      }

      admin.name = name || admin.name;
      admin.role = nextRole;

      if (typeof isActive === 'boolean') {
        admin.isActive = isActive;
      }

      if (typeof mustChangePassword === 'boolean') {
        admin.mustChangePassword = mustChangePassword;
      }

      const updatedAdmin = await admin.save();
      res.json({
        _id: updatedAdmin._id,
        name: updatedAdmin.name,
        email: updatedAdmin.email,
        role: updatedAdmin.role,
        isActive: updatedAdmin.isActive,
        mustChangePassword: updatedAdmin.mustChangePassword,
      });
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete an admin
// @route   DELETE /cms/auth/admins/:id
export const deleteAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.params.id);

    if (admin) {
      if (req.params.id === req.admin._id.toString()) {
        return res.status(400).json({ message: 'You cannot delete your own admin account.' });
      }

      if (admin.role === 'superadmin') {
        const superadminCount = await Admin.countDocuments({ role: 'superadmin' });

        if (superadminCount === 1) {
          return res.status(400).json({ message: 'The last superadmin cannot be deleted.' });
        }
      }

      await Admin.deleteOne({ _id: admin._id });
      res.json({ message: 'Admin removed' });
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Change admin password
// @route   POST /cms/auth/change-password
export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    // Validate inputs with detailed error messages
    if (!currentPassword) {
      return res.status(400).json({ message: 'Current password is required', field: 'currentPassword' });
    }

    if (!newPassword) {
      return res.status(400).json({ message: 'New password is required', field: 'newPassword' });
    }

    if (!confirmPassword) {
      return res.status(400).json({ message: 'Confirm password is required', field: 'confirmPassword' });
    }

    // Validate password length
    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'New password must be at least 6 characters long', field: 'newPassword' });
    }

    // Check if new passwords match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'New passwords do not match', field: 'confirmPassword' });
    }

    // Check if new password is same as current password
    if (currentPassword === newPassword) {
      return res.status(400).json({ message: 'New password must be different from current password', field: 'newPassword' });
    }

    // Get admin from database
    const admin = await Admin.findById(req.admin._id);

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Verify current password
    const isPasswordMatch = await admin.matchPassword(currentPassword);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Current password is incorrect', field: 'currentPassword' });
    }

    // Update password
    admin.password = newPassword;
    admin.mustChangePassword = false;
    await admin.save();

    res.json({
      message: 'Password changed successfully',
      mustChangePassword: admin.mustChangePassword,
    });
  } catch (error) {
    next(error);
  }
};
