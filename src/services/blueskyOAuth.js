import { NodeOAuthClient } from '@atproto/oauth-client-node';

const BASE_URL = 'https://legwarmer-dried-casino.ngrok-free.dev';

const stateStore = new Map();
const sessionStore = new Map();

export const pendingLinked = new Set();

export const oauthClient = new NodeOAuthClient({
  clientMetadata: {
    client_name: 'DopaCoin',
    client_id: `${BASE_URL}/api/auth/client-metadata.json`,  // ✅ https required
    client_uri: BASE_URL,
    redirect_uris: [`${BASE_URL}/api/auth/bsky/callback`],   // ✅ no localhost
    scope: 'atproto transition:generic',
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