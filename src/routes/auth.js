import express from 'express';
import { getNonce, verifySignature, getProfile, logout } from '../controllers/authController.js';
import { requireAuth } from '../middleware/requireAuth.js';
import { initBskyOAuth, bskyOAuthCallback } from '../controllers/authController.js';
import { oauthClient, pendingLinked } from '../services/blueskyOAuth.js';

const router = express.Router();

// Public Routes
router.get('/nonce', getNonce);
router.post('/verify', verifySignature);
router.post('/logout', logout);

// Metadata Route (Must be public so Bluesky can see it)
router.get('/client-metadata.json', (req, res) => {
  res.json(oauthClient.clientMetadata);
});

// Protected Routes
router.get('/profile', requireAuth, getProfile);
router.get('/bsky/init', requireAuth, initBskyOAuth);
router.get('/bsky/callback', bskyOAuthCallback);

router.get('/bsky/status', requireAuth, (req, res) => {
  const userId = req.user.userId;
  if (pendingLinked.has(userId)) {
    pendingLinked.delete(userId);
    return res.json({ linked: true });
  }
  res.json({ linked: false });
});

export default router;