import { generateNonce, SiweMessage } from 'siwe';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { NodeOAuthClient } from '@atproto/oauth-client-node';
import { pendingLinked } from '../services/blueskyOAuth.js';

// These stores keep track of the temporary "handshake" data
const stateStore = new Map();
const sessionStore = new Map();

export const oauthClient = new NodeOAuthClient({
  clientMetadata: {
    client_name: 'DopaCoin',
    // In dev, this must match your backend URL exactly
    client_id: 'https://legwarmer-dried-casino.ngrok-free.dev/api/auth/client-metadata.json',
    client_uri: process.env.CLIENT_URL, // e.g., http://localhost:5173
    redirect_uris: ['https://legwarmer-dried-casino.ngrok-free.dev/api/auth/bsky/callback'],
    scope: 'atproto',
    grant_types: ['authorization_code', 'refresh_token'],
    response_types: ['code'],
    application_type: 'web',
    token_endpoint_auth_method: 'none',
    dpop_bound_access_tokens: true,
  },
  stateStore: {
    set: async (key, val) => { stateStore.set(key, val) },
    get: async (key) => stateStore.get(key),
    del: async (key) => { stateStore.delete(key) },
  },
  sessionStore: {
    set: async (sub, val) => { sessionStore.set(sub, val) },
    get: async (sub) => sessionStore.get(sub),
    del: async (sub) => { sessionStore.delete(sub) },
  },
});

// Instantiate Prisma Client
const prisma = new PrismaClient();

const SIWE_NONCE_COOKIE = 'siwe_nonce';
const siweNonceCookieBase = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  path: '/',
});

// --- 1. Get Nonce ---
export const getNonce = async (req, res) => {
  const nonce = generateNonce();
  res.cookie(SIWE_NONCE_COOKIE, nonce, {
    ...siweNonceCookieBase(),
    maxAge: 10 * 60 * 1000,
  });
  res.setHeader('Content-Type', 'text/plain');
  res.send(nonce);
};

// --- 2. Verify & Login ---
export const verifySignature = async (req, res) => {
  try {
    console.log(req.headers['content-type'], req.body)
    const { message, signature } = req.body;

    console.log("-----------------------------------------");
    console.log("🔍 SIWE Debug Log:");
    console.log("1. Received Message:", message);
    console.log("2. Received Signature:", signature);

    const expectedNonce = req.cookies?.[SIWE_NONCE_COOKIE];
    if (!expectedNonce) {
      return res.status(401).json({
        success: false,
        error: 'Missing or expired sign-in challenge. Request a new nonce.',
      });
    }

    // 1. Reconstruct the message
    const siweMessage = new SiweMessage(message);

    // 2. Verify the signature (nonce must match the one issued with GET /nonce)
    let result;
    try {
      result = await siweMessage.verify({ signature, nonce: expectedNonce });
    } catch (err) {
      return res.status(401).json({
        success: false,
        error: err?.error?.message || err?.message || 'Invalid signature',
      });
    }

    // 3. DEBUG: Check exact failure reason
    if (!result.success) {
      console.error("❌ SIWE Verification Failed!");
      console.error("Reason:", result.error); 
      
      return res.status(401).json({ 
        success: false, 
        error: result.error?.type || "Invalid signature" 
      });
    }
    
    console.log("✅ Signature Verified! Address:", result.data.address);
    const fields = result.data;

    res.clearCookie(SIWE_NONCE_COOKIE, siweNonceCookieBase());

    // 4. Database Logic
    let user = await prisma.user.findUnique({
      where: { address: fields.address }
    });

    if (!user) {
      console.log(`🆕 Creating new user: ${fields.address}`);
      user = await prisma.user.create({
        data: { address: fields.address }
      });
    }

    // 5. Check Secret
    if (!process.env.JWT_SECRET) {
      console.error("❌ CRITICAL ERROR: process.env.JWT_SECRET is missing!");
      throw new Error("Server configuration error: Missing JWT_SECRET");
    }

    // 6. Generate Token
    const token = jwt.sign(
      { userId: user.id, address: user.address, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' }
    );

    // 7. Set Cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

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
  // req.user.userId comes from the middleware
  const user = await prisma.user.findUnique({
    where: { id: req.user.userId }
  });

  if (!user) return res.status(404).json({ error: "User not found" });
  
  res.json({ user });
};

// --- 4. Logout ---
export const logout = (req, res) => {
  res.clearCookie('token');
  res.json({ message: "Logged out successfully" });
};

// --- 5. Bluesky OAuth: Init ---
export const initBskyOAuth = async (req, res) => {
  try {
    const url = await oauthClient.authorize('https://bsky.social', {  // ✅ full URL, not a handle
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
    
    // 1. Process the callback (signatures/state verified by the library)
    const { session, state: userId } = await oauthClient.callback(params);

    // session.did is the verified identity, e.g. "did:plc:abc123"
    // Resolve it to a handle via Bluesky's API
    const profileRes = await fetch(`https://public.api.bsky.app/xrpc/app.bsky.actor.getProfile?actor=${session.did}`);
    const profile = await profileRes.json();
    const verifiedHandle = profile.handle; // e.g. "yourname.bsky.social"

    // 2. Check if handle is already linked
    const existingHandle = await prisma.user.findUnique({
      where: { bskyHandle: verifiedHandle }
    });

    if (existingHandle && existingHandle.id !== userId) {
      return res.send(`
        <script>
          alert("This Bluesky handle is already linked to another wallet.");
          window.close();
        </script>
      `);
    }

    // 3. Update the database
    await prisma.user.update({
      where: { id: userId },
      data: { bskyHandle: verifiedHandle }
    });

    // Flag this user as done
    pendingLinked.add(userId);

    // 4. Close the popup
    res.send(`<script>window.close();</script>`);

  } catch (error) {
    console.error("❌ Bluesky Linking Error:", error);
    res.send(`
      <script>
        alert("Failed to link Bluesky account.");
        window.close();
      </script>
    `);
  }
};