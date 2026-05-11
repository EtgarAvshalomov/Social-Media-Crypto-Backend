"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuthServerAgent = void 0;
const oauth_types_1 = require("@atproto/oauth-types");
const fetch_1 = require("@atproto-labs/fetch");
const token_refresh_error_js_1 = require("./errors/token-refresh-error.js");
const fetch_dpop_js_1 = require("./fetch-dpop.js");
const oauth_client_auth_js_1 = require("./oauth-client-auth.js");
const oauth_response_error_js_1 = require("./oauth-response-error.js");
class OAuthServerAgent {
    /**
     * @throws see {@link createClientCredentialsFactory}
     */
    constructor(authMethod, dpopKey, serverMetadata, clientMetadata, dpopNonces, oauthResolver, runtime, keyset, fetch) {
        Object.defineProperty(this, "authMethod", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: authMethod
        });
        Object.defineProperty(this, "dpopKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: dpopKey
        });
        Object.defineProperty(this, "serverMetadata", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: serverMetadata
        });
        Object.defineProperty(this, "clientMetadata", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: clientMetadata
        });
        Object.defineProperty(this, "dpopNonces", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: dpopNonces
        });
        Object.defineProperty(this, "oauthResolver", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: oauthResolver
        });
        Object.defineProperty(this, "runtime", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: runtime
        });
        Object.defineProperty(this, "keyset", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: keyset
        });
        Object.defineProperty(this, "dpopFetch", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "clientCredentialsFactory", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.clientCredentialsFactory = (0, oauth_client_auth_js_1.createClientCredentialsFactory)(authMethod, serverMetadata, clientMetadata, runtime, keyset);
        this.dpopFetch = (0, fetch_dpop_js_1.dpopFetchWrapper)({
            fetch: (0, fetch_1.bindFetch)(fetch),
            key: dpopKey,
            supportedAlgs: serverMetadata.dpop_signing_alg_values_supported,
            sha256: async (v) => runtime.sha256(v),
            nonces: dpopNonces,
            isAuthServer: true,
        });
    }
    get issuer() {
        return this.serverMetadata.issuer;
    }
    async revoke(token) {
        try {
            await this.request('revocation', { token });
        }
        catch {
            // Don't care
        }
    }
    async exchangeCode(code, codeVerifier, redirectUri) {
        const now = Date.now();
        const tokenResponse = await this.request('token', {
            grant_type: 'authorization_code',
            // redirectUri should always be passed by the calling code, but if it is
            // not, default to the first redirect_uri registered for the client:
            redirect_uri: redirectUri ?? this.clientMetadata.redirect_uris[0],
            code,
            code_verifier: codeVerifier,
        });
        try {
            // /!\ IMPORTANT /!\
            //
            // The tokenResponse MUST always be valid before the "sub" it contains
            // can be trusted (see Atproto's OAuth spec for details).
            const aud = await this.verifyIssuer(tokenResponse.sub);
            return {
                aud,
                sub: tokenResponse.sub,
                iss: this.issuer,
                scope: tokenResponse.scope,
                refresh_token: tokenResponse.refresh_token,
                access_token: tokenResponse.access_token,
                token_type: tokenResponse.token_type,
                expires_at: typeof tokenResponse.expires_in === 'number'
                    ? new Date(now + tokenResponse.expires_in * 1000).toISOString()
                    : undefined,
            };
        }
        catch (err) {
            await this.revoke(tokenResponse.access_token);
            throw err;
        }
    }
    async refresh(tokenSet) {
        if (!tokenSet.refresh_token) {
            throw new token_refresh_error_js_1.TokenRefreshError(tokenSet.sub, 'No refresh token available');
        }
        // /!\ IMPORTANT /!\
        //
        // The "sub" MUST be a DID, whose issuer authority is indeed the server we
        // are trying to obtain credentials from. Note that we are doing this
        // *before* we actually try to refresh the token:
        // 1) To avoid unnecessary refresh
        // 2) So that the refresh is the last async operation, ensuring as few
        //    async operations happen before the result gets a chance to be stored.
        const aud = await this.verifyIssuer(tokenSet.sub);
        const now = Date.now();
        const tokenResponse = await this.request('token', {
            grant_type: 'refresh_token',
            refresh_token: tokenSet.refresh_token,
        });
        return {
            aud,
            sub: tokenSet.sub,
            iss: this.issuer,
            scope: tokenResponse.scope,
            refresh_token: tokenResponse.refresh_token,
            access_token: tokenResponse.access_token,
            token_type: tokenResponse.token_type,
            expires_at: typeof tokenResponse.expires_in === 'number'
                ? new Date(now + tokenResponse.expires_in * 1000).toISOString()
                : undefined,
        };
    }
    /**
     * VERY IMPORTANT ! Always call this to process token responses.
     *
     * Whenever an OAuth token response is received, we **MUST** verify that the
     * "sub" is a DID, whose issuer authority is indeed the server we just
     * obtained credentials from. This check is a critical step to actually be
     * able to use the "sub" (DID) as being the actual user's identifier.
     *
     * @returns The user's PDS URL (the resource server for the user)
     */
    async verifyIssuer(sub) {
        const resolved = await this.oauthResolver.resolveFromIdentity(sub, {
            noCache: true,
            allowStale: false,
            signal: AbortSignal.timeout(10e3),
        });
        if (this.issuer !== resolved.metadata.issuer) {
            // Best case scenario; the user switched PDS. Worst case scenario; a bad
            // actor is trying to impersonate a user. In any case, we must not allow
            // this token to be used.
            throw new TypeError('Issuer mismatch');
        }
        return resolved.pds.href;
    }
    async request(endpoint, payload) {
        const url = this.serverMetadata[`${endpoint}_endpoint`];
        if (!url)
            throw new Error(`No ${endpoint} endpoint available`);
        const auth = await this.clientCredentialsFactory();
        // https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1-13#section-3.2.2
        // https://datatracker.ietf.org/doc/html/rfc7009#section-2.1
        // https://datatracker.ietf.org/doc/html/rfc7662#section-2.1
        // https://datatracker.ietf.org/doc/html/rfc9126#section-2
        const { response, json } = await this.dpopFetch(url, {
            method: 'POST',
            headers: {
                ...auth.headers,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: wwwFormUrlEncode({ ...payload, ...auth.payload }),
        }).then((0, fetch_1.fetchJsonProcessor)());
        if (response.ok) {
            switch (endpoint) {
                case 'token':
                    return oauth_types_1.atprotoOAuthTokenResponseSchema.parse(json);
                case 'pushed_authorization_request':
                    return oauth_types_1.oauthParResponseSchema.parse(json);
                default:
                    return json;
            }
        }
        else {
            throw new oauth_response_error_js_1.OAuthResponseError(response, json);
        }
    }
}
exports.OAuthServerAgent = OAuthServerAgent;
function wwwFormUrlEncode(payload) {
    return new URLSearchParams(Object.entries(payload)
        .filter(entryHasDefinedValue)
        .map(stringifyEntryValue)).toString();
}
function entryHasDefinedValue(entry) {
    return entry[1] !== undefined;
}
function stringifyEntryValue(entry) {
    const name = entry[0];
    const value = entry[1];
    switch (typeof value) {
        case 'string':
            return [name, value];
        case 'number':
        case 'boolean':
            return [name, String(value)];
        default: {
            const enc = JSON.stringify(value);
            if (enc === undefined) {
                throw new Error(`Unsupported value type for ${name}: ${String(value)}`);
            }
            return [name, enc];
        }
    }
}
//# sourceMappingURL=oauth-server-agent.js.map