import express from 'express';
import { PrismaClient } from '@prisma/client';
import { requireAuth } from '../middleware/requireAuth.js';
import { Pingram } from 'pingram';

const router = express.Router();
const prisma  = new PrismaClient();

// Add to your .env:
//   PINGRAM_API_KEY=your_key_here
const pingram = new Pingram({
  apiKey: process.env.PINGRAM_API_KEY,
});

// In-memory store: phone → { code, userId, expires }
const verificationCodes = new Map();

// POST /api/settings/send-phone-code
router.post('/send-phone-code', requireAuth, async (req, res) => {
  try {
    const { phone } = req.body;
    const userId = req.user.userId;

    if (!phone || phone.length < 8) {
      return res.status(400).json({ error: 'Invalid phone number' });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    verificationCodes.set(phone, { code, userId, expires: Date.now() + 10 * 60_000 });

    await pingram.send({
      type: 'otp',
      to: {
        id: userId,
        number: phone, // Must include country code, e.g. +972XXXXXXXXX
      },
      sms: {
        message: `Your DopaCoin verification code is: ${code}. It expires in 10 minutes.`,
      },
    });

    console.log(`[SMS] Code sent to ${phone}`);
    res.status(200).json({ success: true, message: 'Code sent' });

  } catch (error) {
    console.error('SMS send error:', error);
    res.status(500).json({ error: 'Failed to send SMS. Please try again.' });
  }
});

// POST /api/settings/verify-phone-code
router.post('/verify-phone-code', requireAuth, async (req, res) => {
  try {
    const { phone, code } = req.body;
    const userId = req.user.userId;

    const record = verificationCodes.get(phone);

    if (!record || record.code !== code || record.userId !== userId) {
      return res.status(400).json({ error: 'Invalid code' });
    }
    if (Date.now() > record.expires) {
      verificationCodes.delete(phone);
      return res.status(400).json({ error: 'Code expired. Please request a new one.' });
    }

    // Only reaches here on success — old number is untouched in DB if this never runs
    await prisma.user.update({
      where: { id: userId },
      data:  { phoneNumber: phone },
    });

    verificationCodes.delete(phone);

    res.status(200).json({ success: true, message: 'Phone verified' });

  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ error: 'Verification failed' });
  }
});

export default router;
