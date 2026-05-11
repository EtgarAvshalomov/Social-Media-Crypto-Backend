import { Keyset } from '@atproto/jwk';
import { OAuthAuthorizationServerMetadata, OAuthClientCredentials } from '@atproto/oauth-types';
import { Runtime } from './runtime.js';
import { ClientMetadata } from './types.js';
import { Awaitable } from './util.js';
export type ClientAuthMethod = {
    method: 'none';
} | {
    method: 'private_key_jwt';
    kid: string;
};
export declare function negotiateClientAuthMethod(serverMetadata: OAuthAuthorizationServerMetadata, clientMetadata: ClientMetadata, keyset?: Keyset): ClientAuthMethod;
export type ClientCredentialsFactory = () => Awaitable<{
    headers?: Record<string, string>;
    payload?: OAuthClientCredentials;
}>;
/**
 * @throws {AuthMethodUnsatisfiableError} if the authentication method is no
 * long usable (either because the AS changed, of because the key is no longer
 * available in the keyset).
 */
export declare function createClientCredentialsFactory(authMethod: ClientAuthMethod, serverMetadata: OAuthAuthorizationServerMetadata, clientMetadata: ClientMetadata, runtime: Runtime, keyset?: Keyset): ClientCredentialsFactory;
//# sourceMappingURL=oauth-client-auth.d.ts.map