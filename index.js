// index.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from './src/routes/auth.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all origins (for local development)
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
console.log('Step 1: CORS policy added');

app.use(express.json());
console.log('Step 2: JSON middleware added');

app.use(cookieParser());
console.log('Step 3: Cookies middleware added')

// Health test
app.get('/health', (req, res) => {
    res.json({ message: 'Healthy!' });
});
console.log('Step 4: Health test route added');

app.use('/api/auth', authRouter);
console.log('Step 5: Auth router mounted');

app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});