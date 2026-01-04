// src/routes/auth.js - Authentication routes
import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { generateNonce, SiweMessage } from 'siwe';
import { PrismaClient } from '../generated/prisma/index.js';
import { requireAuth } from '../middleware/userAuth.js';

const router = Router();
// const prisma = new PrismaClient();

// const JWT_SECRET = process.env.JWT_SECRET;

// // POST /api/auth/register - Register a new user
// router.post('/register', async (req, res) => {
//     try {
//         const { firstName, lastName, email, password } = req.body;

//         if (!firstName || !lastName || !email || !password) {
//             return res.status(400).send('All fields are required');
//         }

//         const passwordByteLength = new TextEncoder().encode(password).length;

//         if(firstName.length > 50) return res.status(400).send({message: 'First name too long'});
//         if(lastName.length > 50) return res.status(400).send({message: 'Last name too long'});
//         if(email.length > 320) return res.status(400).send({message: 'E-mail too long'});
//         if(passwordByteLength > 72) return res.status(400).send({message: 'Password too long'});

//         // Check if email already exists
//         const existingUser = await prisma.users.findUnique({ where: { email } });
//         if (existingUser) return res.status(400).send({message: 'E-mail already exists'});

//         // Hash password
//         const hashedPassword = await bcrypt.hash(password, 10);
//         await prisma.users.create({
//             data: { first_name: firstName.toLowerCase(), last_name: lastName.toLowerCase(), email: email.toLowerCase(), password_hash: hashedPassword }
//         });

//         // Find user
//         const user = await prisma.users.findUnique({ where: { email } });
//         if (!user) return res.status(400).send({message: 'Error creating user'});

//         /// Login user
//         const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

//         res.cookie('token', token, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === 'production',
//             sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
//             maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//         });

//         res.status(201).json({ message: 'User registered successfully' });
//     } catch (error) {
//         res.status(500).json({ error: 'Server error ' + error.message, stack: error.stack || '' });
//     }
// });

// // POST /api/auth/login - Login a user
// router.post('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         if (!email || !password) {
//             return res.status(400).send('Email and password are required');
//         }

//         // Find user
//         const lowerEmail = email.toLowerCase();
//         const user = await prisma.users.findUnique({ where: { email: lowerEmail } });
//         if (!user) return res.status(400).send({message: 'Invalid credentials' });

//         // Check if password is correct
//         const valid = await bcrypt.compare(password, user.password_hash);
//         if (!valid) return res.status(400).send({message: 'Invalid credentials' });

//         // Login user
//         const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

//         res.cookie('token', token, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === 'production',
//             sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
//             maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//         });

//         res.status(200).json({ message: 'Login successful' });
//     } catch (error) {
//         res.status(500).json({ error: 'Server error ' + error.message, stack: error.stack || '' });
//     }
// });

// // POST /api/auth/logout - Logout a user
// router.post('/logout', (req, res) => {
//     if (!req.cookies.token) {
//         return res.status(401).json({ message: 'Not logged in' });
//     }

//     res.clearCookie('token', {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production',
//         sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
//     });

//     res.status(200).json({ message: 'Logged out successfully' });
// });

// // GET /api/auth/verify - Verify logged-in user
// router.get('/verify', authenticateToken, (req, res) => {
//     res.status(200).json({ message: 'Authenticated' });
// });

// // GET /api/auth/profile - Get user profile
// router.get('/profile', authenticateToken, async (req, res) => {
//     try {
//         const user = await prisma.users.findUnique({ where: { id: req.user.userId } });
//         if (!user) return res.status(404).json({ error: 'User not found' });

//         res.status(200).json({ id: user.id, firstName: user.first_name, lastName: user.last_name, email: user.email });
//     } catch (error) {
//         res.status(500).json({ error: 'Server error: ' + error.message, stack: error.stack || '' });
//     }
// });

const JWT_SECRET = process.env.JWT_SECRET;

// --- ROUTE 1: GET NONCE ---
// Using the official generator which creates a cryptographically secure string
router.get('/nonce', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.send(generateNonce());
});

// --- ROUTE 2: Login ---
router.post('/login', async function (req, res) {
  const { message, signature } = req.body;

  try {
    // 1. Initialize the SIWE Message object from the string received
    const siweMessage = new SiweMessage(message);

    // 2. VERIFY
    // This one function checks everything:
    // - Signature matches address?
    // - Domain matches? (Optional but recommended)
    // - Nonce is valid?
    // - Time is valid (not expired)?
    const { data: fields } = await siweMessage.verify({ signature });
    
    // If we get here, the signature is VALID.
    
    console.log(`✅ User verified: ${fields.address}`);

    // 3. Issue Token
    const token = jwt.sign({ address: fields.address }, JWT_SECRET, { expiresIn: '7d' });
    
    res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

    res.status(200).json({ message: 'Login successful' });

  } catch (e) {
    console.error("Verification failed:", e.message);
    res.status(401).json({ message: 'Login failed', error: e.message });
  }
});

// --- ROUTE 3: Profile ---
router.get('/profile', requireAuth, (req, res) => {
    res.json({ message: "You are authorized!", user: req.user });
});

export default router;