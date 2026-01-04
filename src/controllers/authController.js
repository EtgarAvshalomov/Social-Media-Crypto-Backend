import { generateNonce, SiweMessage } from 'siwe';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

// Instantiate Prisma Client
const prisma = new PrismaClient();

// --- 1. Get Nonce ---
export const getNonce = async (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.send(generateNonce());
};

// --- 2. Verify & Login ---
export const verifySignature = async (req, res) => {
  try {
    const { message, signature } = req.body;

    console.log("-----------------------------------------");
    console.log("🔍 SIWE Debug Log:");
    console.log("1. Received Message:", message);
    console.log("2. Received Signature:", signature);

    // 1. Reconstruct the message
    const siweMessage = new SiweMessage(message);

    // 2. Verify the signature
    const result = await siweMessage.verify({ signature });

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