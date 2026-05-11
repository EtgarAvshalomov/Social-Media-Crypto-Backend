import { AtprotoDid } from '@atproto/did';
import { Key, Keyset } from '@atproto/jwk';
import { AtprotoOAuthScope, AtprotoOAuthTokenResponse, OAuthAuthorizationRequestPar, OAuthAuthorizationServerMetadata, OAuthEndpointName, OAuthParResponse, OAuthRedirectUri, OAuthTokenRequest } from '@atproto/oauth-types';
import { Fetch, Json } from '@atproto-labs/fetch';
import { SimpleStore } from '@atproto-labs/simple-store';
import { ClientAuthMethod, ClientCredentialsFactory } from './oauth-client-auth.js';
import { OAuthResolver } from './oauth-resolver.js';
import { Runtime } from './runtime.js';
import { ClientMetadata } from './types.js';
export type { AtprotoOAuthScope, AtprotoOAuthTokenResponse };
export type TokenSet = {
    iss: string;
    sub: AtprotoDid;
    aud: string;
    scope: AtprotoOAuthScope;
    refresh_token?: string;
    access_token: string;
    token_type: 'DPoP';
    /** ISO Date */
    expires_at?: string;
};
export type DpopNonceCache = SimpleStore<string, string>;
export declare class OAuthServerAgent {
    readonly authMethod: ClientAuthMethod;
    readonly dpopKey: Key;
    readonly serverMetadata: OAuthAuthorizationServerMetadata;
    readonly clientMetadata: ClientMetadata;
    readonly dpopNonces: DpopNonceCache;
    readonly oauthResolver: OAuthResolver;
    readonly runtime: Runtime;
    readonly keyset?: Keyset | undefined;
    protected dpopFetch: Fetch<unknown>;
    protected clientCredentialsFactory: ClientCredentialsFactory;
    /**
     * @throws see {@link createClientCredentialsFactory}
     */
    constructor(authMethod: ClientAuthMethod, dpopKey: Key, serverMetadata: OAuthAuthorizationServerMetadata, clientMetadata: ClientMetadata, dpopNonces: DpopNonceCache, oauthResolver: OAuthResolver, runtime: Runtime, keyset?: Keyset | undefined, fetch?: Fetch);
    get issuer(): `http://[::1]${string}` | "http://localhost" | `http://localhost#${string}` | `http://localhost?${string}` | `http://localhost/${string}` | `http://localhost:${string}` | "http://127.0.0.1" | `http://127.0.0.1#${string}` | `http://127.0.0.1?${string}` | `http://127.0.0.1/${string}` | `http://127.0.0.1:${string}` | `https://${string}`;
    revoke(token: string): Promise<void>;
    exchangeCode(code: string, codeVerifier?: string, redirectUri?: OAuthRedirectUri): Promise<TokenSet>;
    refresh(tokenSet: TokenSet): Promise<TokenSet>;
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
    protected verifyIssuer(sub: AtprotoDid): Promise<string>;
    request<Endpoint extends OAuthEndpointName>(endpoint: Endpoint, payload: Endpoint extends 'token' ? OAuthTokenRequest : Endpoint extends 'pushed_authorization_request' ? OAuthAuthorizationRequestPar : Record<string, unknown>): Promise<Endpoint extends 'token' ? AtprotoOAuthTokenResponse : Endpoint extends 'pushed_authorization_request' ? OAuthParResponse : Json>;
}
//# sourceMappingURL=oauth-server-agent.d.ts.map