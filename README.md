# DopaCoin — Backend

The Node.js/Express API server for DopaCoin. Handles wallet authentication, Bluesky activity syncing, token reward logic, and on-chain transfers to user wallets.

**Live backend:** hosted on [Render](https://render.com)  
**Frontend repo:** [Social-Media-Crypto-Frontend](https://github.com/EtgarAvshalomov/Social-Media-Crypto-Frontend)

---

## What it does

DopaCoin rewards users with **DOPA tokens** (an ERC-20 on Polygon Amoy testnet) for their activity on [Bluesky](https://bsky.app). The backend is responsible for:

- Authenticating users via **Sign-In with Ethereum (SIWE)** — no passwords, no email
- Linking a user's Ethereum wallet to their Bluesky handle via **AT Protocol OAuth**
- Scraping the user's Bluesky feed and likes to detect new posts, replies, and likes
- Applying **daily earning caps** and deduplication to prevent abuse
- Sending earned DOPA tokens directly to the user's MetaMask wallet via an on-chain ERC-20 transfer
- Verifying phone numbers via **Pingram SMS** as a withdrawal prerequisite

---

## Tech stack

| Layer | Technology |
|---|---|
| Runtime | Node.js (ESM) |
| Framework | Express |
| Database | PostgreSQL via **Prisma ORM** |
| Auth | SIWE + JWT (httpOnly cookies) |
| Bluesky | `@atproto/api` + AT Protocol OAuth |
| Blockchain | **ethers.js v6** — Polygon Amoy testnet |
| SMS | Pingram |
| Hosting | Render |

---

## Project structure

```
├── index.js                  # Entry point — Express app, middleware, route mounting
├── prisma/
│   └── schema.prisma         # Database schema (User, UserPost, UserReply, UserLike)
└── src/
    ├── controllers/
    │   └── authController.js # SIWE nonce/verify, JWT issuance, Bluesky OAuth callback
    ├── middleware/
    │   └── requireAuth.js    # JWT cookie verification middleware
    ├── routes/
    │   ├── auth.js           # /api/auth — nonce, verify, profile, logout, bsky OAuth
    │   ├── activity.js       # /api/activity — Bluesky scraper, dashboard data
    │   ├── wallet.js         # /api/wallet — on-chain DOPA transfer
    │   └── settings.js       # /api/settings — phone verification (Pingram)
    └── services/
        └── blueskyOAuth.js   # AT Protocol OAuth client + session/state stores
```

---

## API routes

### Auth — `/api/auth`
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/nonce` | Public | Issues a one-time SIWE challenge, stored in a `httpOnly` cookie |
| POST | `/verify` | Public | Verifies SIWE signature, creates user if new, sets JWT cookie |
| GET | `/profile` | 🔒 | Returns the authenticated user's profile |
| POST | `/logout` | Public | Clears the JWT cookie |
| GET | `/bsky/init` | 🔒 | Starts Bluesky OAuth flow, returns redirect URL |
| GET | `/bsky/callback` | Public | AT Protocol OAuth callback — links Bluesky handle to wallet |
| GET | `/bsky/status` | 🔒 | Polling endpoint — returns `{ linked: true }` once OAuth completes |
| GET | `/client-metadata.json` | Public | AT Protocol client metadata (must be publicly accessible) |

### Activity — `/api/activity`
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/refreshActivity` | 🔒 | Scrapes the user's Bluesky feed and likes, saves new activity, awards coins |
| GET | `/getActivity` | 🔒 | Returns dashboard stats, daily limits, and paginated activity log |

### Wallet — `/api/wallet`
| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/sendFundsToWallet` | 🔒 | Transfers all pending DOPA tokens to the user's Ethereum address on-chain |

### Settings — `/api/settings`
| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/send-phone-code` | 🔒 | Sends a 6-digit OTP to the given phone number via Pingram |
| POST | `/verify-phone-code` | 🔒 | Verifies OTP and saves the phone number to the user's profile |

---

## Reward rules

| Action | Coins | Daily cap |
|---|---|---|
| Create a post | +10 DOPA | 5 posts (50 coins max) |
| Reply to another user | +1 DOPA | 25 replies |
| Like another user's post | +1 DOPA | 25 likes |

Daily caps reset at **midnight Israel time (Asia/Jerusalem)**. Self-replies and self-likes do not earn coins. The unlike/relike exploit is prevented by deduplicating on the liked post's URI, not the like record's own URI.

---

## Environment variables

Create a `.env` file in the root:

```env
# Server
PORT=3000
NODE_ENV=production
CLIENT_URL=https://your-frontend.vercel.app

# Database
DATABASE_URL=postgresql://user:password@host:5432/dbname

# Auth
JWT_SECRET=a_long_random_secret

# Bluesky (service account for scraping)
BSKY_SERVICE_HANDLE=yourbot.bsky.social
BSKY_SERVICE_PASSWORD=your-app-password

# Blockchain
ADMIN_PRIVATE_KEY=0xYOUR_WALLET_PRIVATE_KEY
DOPA_TOKEN_ADDRESS=0xYOUR_ERC20_CONTRACT_ADDRESS

# SMS
PINGRAM_API_KEY=your_pingram_key
```

> ⚠️ **Never commit `.env` to git.** Make sure `.env` is in your `.gitignore`.

---

## Local development

```bash
# Install dependencies
npm install

# Set up the database
npx prisma migrate dev

# Start the dev server
node --watch index.js
```

The server starts on `http://localhost:3000` by default.

---

## Deployment (Render)

1. Connect the repo to Render as a **Web Service**
2. Set all environment variables in the Render dashboard
3. Set the start command to `node index.js`
4. `app.set('trust proxy', 1)` is already configured in `index.js` — this is required for secure cookies to work behind Render's reverse proxy

---

## Database schema (summary)

```
User          — wallet address, bskyHandle, phoneNumber, token balances
UserPost      — post URI, status (available / cap_hit / claimed), createdAt
UserReply     — reply URI, status, createdAt
UserLike      — liked post URI, status, createdAt
```

Prisma schema lives at `prisma/schema.prisma`.
