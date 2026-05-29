import { generateNonce, SiweMessage } from 'siwe';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { oauthClient, pendingLinked } from '../services/blueskyOAuth.js';

const prisma = new PrismaClient();

const SIWE_NONCE_COOKIE = 'siwe_nonce';

// Single source of truth for cookie attributes — used for set AND clear
const cookieOptions = (maxAge) => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  path: '/',
  ...(maxAge !== undefined ? { maxAge } : {}),
});

// --- 1. Get Nonce ---
export const getNonce = async (req, res) => {
  const nonce = generateNonce();
  res.cookie(SIWE_NONCE_COOKIE, nonce, cookieOptions(10 * 60 * 1000));
  res.setHeader('Content-Type', 'text/plain');
  res.send(nonce);
};

// --- 2. Verify & Login ---
export const verifySignature = async (req, res) => {
  try {
    console.log(req.headers['content-type'], req.body);
    const { message, signature } = req.body;

    console.log("-----------------------------------------");
    console.log("🔍 SIWE Debug Log:");
    console.log("1. Received Message:", message);
    console.log("2. Received Signature:", signature);

    const expectedNonce = req.cookies?.[SIWE_NONCE_COOKIE];
    console.log("3. Nonce from cookie:", expectedNonce);

    if (!expectedNonce) {
      return res.status(401).json({
        success: false,
        error: 'Missing or expired sign-in challenge. Request a new nonce.',
      });
    }

    const siweMessage = new SiweMessage(message);

    let result;
    try {
      result = await siweMessage.verify({ signature, nonce: expectedNonce });
    } catch (err) {
      return res.status(401).json({
        success: false,
        error: err?.error?.message || err?.message || 'Invalid signature',
      });
    }

    if (!result.success) {
      console.error("❌ SIWE Verification Failed! Reason:", result.error);
      return res.status(401).json({
        success: false,
        error: result.error?.type || "Invalid signature"
      });
    }

    console.log("✅ Signature Verified! Address:", result.data.address);
    const fields = result.data;

    // ✅ Clear with identical attributes — browser won't honour a cross-origin
    // clear unless sameSite/secure/path all match the original Set-Cookie
    res.clearCookie(SIWE_NONCE_COOKIE, cookieOptions());

    let user = await prisma.user.findUnique({ where: { address: fields.address } });
    if (!user) {
      console.log(`🆕 Creating new user: ${fields.address}`);
      user = await prisma.user.create({ data: { address: fields.address } });
    }

    if (!process.env.JWT_SECRET) {
      console.error("❌ CRITICAL: JWT_SECRET is missing!");
      throw new Error("Server configuration error: Missing JWT_SECRET");
    }

    const token = jwt.sign(
      { userId: user.id, address: user.address, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.cookie('token', token, cookieOptions(7 * 24 * 60 * 60 * 1000));

    console.log("✅ Login Successful. Cookie Set.");
    console.log("-----------------------------------------");

    res.status(200).json({ success: true, user });

  } catch (e) {
    console.error("❌ Login System Error:", e.message);
    res.status(500).json({ success: false, error: e.message });
  }
};

// --- 3. Get User Profile ---
export const getProfile = async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.user.userId } });
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json({ user });
};

// --- 4. Logout ---
export const logout = (req, res) => {
  // ✅ Must match original cookie attributes or browser ignores the clear
  res.clearCookie('token', cookieOptions());
  res.json({ message: "Logged out successfully" });
};

// --- 5. Bluesky OAuth: Init ---
export const initBskyOAuth = async (req, res) => {
  try {
    const url = await oauthClient.authorize('https://bsky.social', {
      scope: 'atproto transition:generic',
      state: req.user.userId
    });
    res.json({ success: true, url: url.toString() });
  } catch (error) {
    console.error("❌ OAuth Init Error:", error);
    res.status(500).json({ error: "Failed to initialize Bluesky login" });
  }
};

// --- 6. Bluesky OAuth: Callback & Link ---
export const bskyOAuthCallback = async (req, res) => {
  try {
    const params = new URLSearchParams(req.query);
    const { session, state: userId } = await oauthClient.callback(params);

    const profileRes = await fetch(`https://public.api.bsky.app/xrpc/app.bsky.actor.getProfile?actor=${session.did}`);
    const profile = await profileRes.json();
    const verifiedHandle = profile.handle;

    const existingHandle = await prisma.user.findUnique({ where: { bskyHandle: verifiedHandle } });
    if (existingHandle && existingHandle.id !== userId) {
      return res.send(`<script>alert("This Bluesky handle is already linked to another wallet."); window.close();</script>`);
    }

    await prisma.user.update({
      where: { id: userId },
      data: { bskyHandle: verifiedHandle }
    });

    pendingLinked.add(userId);
    res.send(`<script>window.close();</script>`);

  } catch (error) {
    console.error("❌ Bluesky Linking Error:", error);
    res.send(`<script>alert("Failed to link Bluesky account."); window.close();</script>`);
  }
};