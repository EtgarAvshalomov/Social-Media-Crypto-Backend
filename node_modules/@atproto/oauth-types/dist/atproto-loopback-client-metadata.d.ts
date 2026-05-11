import { OAuthLoopbackClientIdConfig } from './atproto-loopback-client-id.js';
import { AtprotoOAuthScope } from './atproto-oauth-scope.js';
import { OAuthClientIdLoopback } from './oauth-client-id-loopback.js';
import { OAuthClientMetadataInput } from './oauth-client-metadata.js';
import { OAuthLoopbackRedirectURI } from './oauth-redirect-uri.js';
export type AtprotoLoopbackClientMetadata = OAuthClientMetadataInput & {
    client_id: OAuthClientIdLoopback;
    scope: AtprotoOAuthScope;
    redirect_uris: [OAuthLoopbackRedirectURI, ...OAuthLoopbackRedirectURI[]];
};
export declare function atprotoLoopbackClientMetadata(clientId: string): AtprotoLoopbackClientMetadata;
export declare function buildAtprotoLoopbackClientMetadata(config: OAuthLoopbackClientIdConfig): AtprotoLoopbackClientMetadata;
//# sourceMappingURL=atproto-loopback-client-metadata.d.ts.map