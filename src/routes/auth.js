import express from 'express';
import { getNonce, verifySignature, getProfile, logout } from '../controllers/authController.js';
import { requireAuth } from '../middleware/requireAuth.js';

const router = express.Router();

// Public Routes
router.get('/nonce', getNonce);
router.post('/verify', verifySignature);
router.post('/logout', logout);

// Protected Routes
router.get('/profile', requireAuth, getProfile);

export default router;