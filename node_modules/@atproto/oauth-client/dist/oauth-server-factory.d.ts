import { Key, Keyset } from '@atproto/jwk';
import { OAuthAuthorizationServerMetadata } from '@atproto/oauth-types';
import { Fetch } from '@atproto-labs/fetch';
import { GetCachedOptions } from './oauth-authorization-server-metadata-resolver.js';
import { ClientAuthMethod } from './oauth-client-auth.js';
import { OAuthResolver } from './oauth-resolver.js';
import { DpopNonceCache, OAuthServerAgent } from './oauth-server-agent.js';
import { Runtime } from './runtime.js';
import { ClientMetadata } from './types.js';
export declare class OAuthServerFactory {
    readonly clientMetadata: ClientMetadata;
    readonly runtime: Runtime;
    readonly resolver: OAuthResolver;
    readonly fetch: Fetch;
    readonly keyset: Keyset | undefined;
    readonly dpopNonceCache: DpopNonceCache;
    constructor(clientMetadata: ClientMetadata, runtime: Runtime, resolver: OAuthResolver, fetch: Fetch, keyset: Keyset | undefined, dpopNonceCache: DpopNonceCache);
    /**
     * @param authMethod `undefined` means that we are restoring a session that
     * was created before we started storing the `authMethod` in the session. In
     * that case, we will use the first key from the keyset.
     *
     * Support for this might be removed in the future.
     *
     * @throws see {@link OAuthServerFactory.fromMetadata}
     */
    fromIssuer(issuer: string, authMethod: ClientAuthMethod, dpopKey: Key, options?: GetCachedOptions): Promise<OAuthServerAgent>;
    /**
     * @throws see {@link OAuthServerAgent}
     */
    fromMetadata(serverMetadata: OAuthAuthorizationServerMetadata, authMethod: ClientAuthMethod, dpopKey: Key): Promise<OAuthServerAgent>;
}
//# sourceMappingURL=oauth-server-factory.d.ts.map