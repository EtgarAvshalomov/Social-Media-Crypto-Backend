import { AtprotoOAuthScope } from './atproto-oauth-scope.js';
import { OAuthClientIdLoopback } from './oauth-client-id-loopback.js';
import { OAuthLoopbackRedirectURI } from './oauth-redirect-uri.js';
export type OAuthLoopbackClientIdConfig = {
    scope?: string;
    redirect_uris?: Iterable<string>;
};
export declare function buildAtprotoLoopbackClientId(config?: OAuthLoopbackClientIdConfig): OAuthClientIdLoopback;
export type AtprotoLoopbackClientIdParams = {
    scope: AtprotoOAuthScope;
    redirect_uris: [OAuthLoopbackRedirectURI, ...OAuthLoopbackRedirectURI[]];
};
export declare function parseAtprotoLoopbackClientId(clientId: string): AtprotoLoopbackClientIdParams;
//# sourceMappingURL=atproto-loopback-client-id.d.ts.map