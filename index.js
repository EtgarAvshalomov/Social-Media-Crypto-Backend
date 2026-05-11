// index.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from './src/routes/auth.js';
import settingsRoutes from './src/routes/settings.js';
import activityRoutes from './src/routes/activity.js';
import walletRoutes from './src/routes/wallet.js';

const app = express();
const PORT = process.env.PORT || 3000;

let step = 0;

// Enable CORS for all origins (for local development)
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
console.log(`Step ${++step}: CORS policy added`);

app.use(express.json());
console.log(`Step ${++step}: JSON middleware added`);

app.use(cookieParser());
console.log(`Step ${++step}: Cookies middleware added`);

// Health test
app.get('/health', (req, res) => {
    res.json({ message: 'Healthy!' });
});
console.log(`Step ${++step}: Health test route added`);

app.use('/api/auth', authRouter);
console.log(`Step ${++step}: Auth router mounted`);

// Mount the routes
app.use('/api/settings', settingsRoutes);
console.log(`Step ${++step}: Settings routes mounted`);

app.use('/api/activity', activityRoutes); 
console.log(`Step ${++step}: Activity routes mounted`);

app.use('/api/wallet', walletRoutes);
console.log(`Step ${++step}: Wallet routes mounted`);

app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});