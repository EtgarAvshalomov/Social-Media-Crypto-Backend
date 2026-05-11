import { Key, Keyset } from '@atproto/jwk';
import { OAuthClientIdDiscoverable, OAuthClientMetadata, OAuthClientMetadataInput, OAuthResponseMode } from '@atproto/oauth-types';
import { AtprotoDid, DidCache } from '@atproto-labs/did-resolver';
import { Fetch } from '@atproto-labs/fetch';
import { HandleCache, HandleResolver } from '@atproto-labs/handle-resolver';
import { CreateIdentityResolverOptions } from './identity-resolver.js';
import { AuthorizationServerMetadataCache } from './oauth-authorization-server-metadata-resolver.js';
import { ProtectedResourceMetadataCache } from './oauth-protected-resource-metadata-resolver.js';
import { OAuthResolver } from './oauth-resolver.js';
import { DpopNonceCache, OAuthServerAgent } from './oauth-server-agent.js';
import { OAuthServerFactory } from './oauth-server-factory.js';
import { OAuthSession } from './oauth-session.js';
import { RuntimeImplementation } from './runtime-implementation.js';
import { Runtime } from './runtime.js';
import { SessionGetter, SessionHooks, SessionStore } from './session-getter.js';
import { InternalStateData, StateStore } from './state-store.js';
import { AuthorizeOptions, CallbackOptions, ClientMetadata } from './types.js';
export type { AuthorizationServerMetadataCache, CreateIdentityResolverOptions, DidCache, DpopNonceCache, Fetch, HandleCache, HandleResolver, InternalStateData, OAuthClientMetadata, OAuthClientMetadataInput, OAuthResponseMode, ProtectedResourceMetadataCache, RuntimeImplementation, SessionHooks, SessionStore, StateStore, };
export { Key, Keyset };
export type OAuthClientOptions = {
    responseMode: OAuthResponseMode;
    clientMetadata: Readonly<OAuthClientMetadataInput>;
    keyset?: Keyset | Iterable<Key | undefined | null | false>;
    /**
     * Determines if the client will allow communicating with the OAuth Servers
     * (Authorization & Resource), or to retrieve "did:web" documents, over
     * unsafe HTTP connections. It is recommended to set this to `true` only for
     * development purposes.
     *
     * @note This does not affect the identity resolution mechanism, which will
     * allow HTTP connections to the PLC Directory (if the provided directory url
     * is "http:" based).
     * @default false
     * @see {@link OAuthProtectedResourceMetadataResolver.allowHttpResource}
     * @see {@link OAuthAuthorizationServerMetadataResolver.allowHttpIssuer}
     * @see {@link DidResolverCommonOptions.allowHttp}
     */
    allowHttp?: boolean;
    stateStore: StateStore;
    sessionStore: SessionStore;
    authorizationServerMetadataCache?: AuthorizationServerMetadataCache;
    protectedResourceMetadataCache?: ProtectedResourceMetadataCache;
    dpopNonceCache?: DpopNonceCache;
    runtimeImplementation: RuntimeImplementation;
    fetch?: Fetch;
} & CreateIdentityResolverOptions & SessionHooks;
export type OAuthClientFetchMetadataOptions = {
    clientId: OAuthClientIdDiscoverable;
    fetch?: Fetch;
    signal?: AbortSignal;
};
export declare class OAuthClient {
    static fetchMetadata({ clientId, fetch, signal, }: OAuthClientFetchMetadataOptions): Promise<{
        redirect_uris: [`http://[::1]${string}` | "http://127.0.0.1" | `http://127.0.0.1#${string}` | `http://127.0.0.1?${string}` | `http://127.0.0.1/${string}` | `http://127.0.0.1:${string}` | `https://${string}` | `${string}.${string}:/${string}`, ...(`http://[::1]${string}` | "http://127.0.0.1" | `http://127.0.0.1#${string}` | `http://127.0.0.1?${string}` | `http://127.0.0.1/${string}` | `http://127.0.0.1:${string}` | `https://${string}` | `${string}.${string}:/${string}`)[]];
        response_types: ["code" | "none" | "token" | "code id_token token" | "code id_token" | "code token" | "id_token token" | "id_token", ...("code" | "none" | "token" | "code id_token token" | "code id_token" | "code token" | "id_token token" | "id_token")[]];
        grant_types: ["authorization_code" | "implicit" | "refresh_token" | "password" | "client_credentials" | "urn:ietf:params:oauth:grant-type:jwt-bearer" | "urn:ietf:params:oauth:grant-type:saml2-bearer", ...("authorization_code" | "implicit" | "refresh_token" | "password" | "client_credentials" | "urn:ietf:params:oauth:grant-type:jwt-bearer" | "urn:ietf:params:oauth:grant-type:saml2-bearer")[]];
        token_endpoint_auth_method: "client_secret_basic" | "client_secret_jwt" | "client_secret_post" | "none" | "private_key_jwt" | "self_signed_tls_client_auth" | "tls_client_auth";
        application_type: "web" | "native";
        subject_type: "public" | "pairwise";
        authorization_signed_response_alg: string;
        scope?: string | undefined;
        token_endpoint_auth_signing_alg?: string | undefined;
        userinfo_signed_response_alg?: string | undefined;
        userinfo_encrypted_response_alg?: string | undefined;
        jwks_uri?: `http://[::1]${string}` | "http://localhost" | `http://localhost#${string}` | `http://localhost?${string}` | `http://localhost/${string}` | `http://localhost:${string}` | "http://127.0.0.1" | `http://127.0.0.1#${string}` | `http://127.0.0.1?${string}` | `http://127.0.0.1/${string}` | `http://127.0.0.1:${string}` | `https://${string}` | undefined;
        jwks?: {
            keys: ((({
                kty: "RSA";
                n: string;
                e: string;
                alg?: "RS256" | "RS384" | "RS512" | "PS256" | "PS384" | "PS512" | undefined;
                kid?: string | undefined;
                use?: "sig" | "enc" | undefined;
                key_ops?: ("verify" | "encrypt" | "wrapKey" | "sign" | "decrypt" | "unwrapKey" | "deriveKey" | "deriveBits")[] | undefined;
                x5c?: string[] | undefined;
                x5t?: string | undefined;
                "x5t#S256"?: string | undefined;
                x5u?: string | undefined;
                ext?: boolean | undefined;
                iat?: number | undefined;
                exp?: number | undefined;
                nbf?: number | undefined;
                revoked?: {
                    revoked_at: number;
                    reason?: string | undefined;
                } | undefined;
                d?: string | undefined;
                p?: string | undefined;
                q?: string | undefined;
                dp?: string | undefined;
                dq?: string | undefined;
                qi?: string | undefined;
                oth?: {
                    d?: string | undefined;
                    r?: string | undefined;
                    t?: string | undefined;
                }[] | undefined;
            } & {
                kid: NonNullable<unknown>;
            }) | ({
                kty: "EC";
                crv: "P-256" | "P-384" | "P-521";
                x: string;
                y: string;
                alg?: "ES256" | "ES384" | "ES512" | undefined;
                kid?: string | undefined;
                use?: "sig" | "enc" | undefined;
                key_ops?: ("verify" | "encrypt" | "wrapKey" | "sign" | "decrypt" | "unwrapKey" | "deriveKey" | "deriveBits")[] | undefined;
                x5c?: string[] | undefined;
                x5t?: string | undefined;
                "x5t#S256"?: string | undefined;
                x5u?: string | undefined;
                ext?: boolean | undefined;
                iat?: number | undefined;
                exp?: number | undefined;
                nbf?: number | undefined;
                revoked?: {
                    revoked_at: number;
                    reason?: string | undefined;
                } | undefined;
                d?: string | undefined;
            } & {
                kid: NonNullable<unknown>;
            }) | ({
                kty: "EC";
                crv: "secp256k1";
                x: string;
                y: string;
                alg?: "ES256K" | undefined;
                kid?: string | undefined;
                use?: "sig" | "enc" | undefined;
                key_ops?: ("verify" | "encrypt" | "wrapKey" | "sign" | "decrypt" | "unwrapKey" | "deriveKey" | "deriveBits")[] | undefined;
                x5c?: string[] | undefined;
                x5t?: string | undefined;
                "x5t#S256"?: string | undefined;
                x5u?: string | undefined;
                ext?: boolean | undefined;
                iat?: number | undefined;
                exp?: number | undefined;
                nbf?: number | undefined;
                revoked?: {
                    revoked_at: number;
                    reason?: string | undefined;
                } | undefined;
                d?: string | undefined;
            } & {
                kid: NonNullable<unknown>;
            }) | ({
                kty: "OKP";
                crv: "Ed25519" | "Ed448";
                x: string;
                alg?: "EdDSA" | undefined;
                kid?: string | undefined;
                use?: "sig" | "enc" | undefined;
                key_ops?: ("verify" | "encrypt" | "wrapKey" | "sign" | "decrypt" | "unwrapKey" | "deriveKey" | "deriveBits")[] | undefined;
                x5c?: string[] | undefined;
                x5t?: string | undefined;
                "x5t#S256"?: string | undefined;
                x5u?: string | undefined;
                ext?: boolean | undefined;
                iat?: number | undefined;
                exp?: number | undefined;
                nbf?: number | undefined;
                revoked?: {
                    revoked_at: number;
                    reason?: string | undefined;
                } | undefined;
                d?: string | undefined;
            } & {
                kid: NonNullable<unknown>;
            })) & {
                d?: never;
            })[];
        } | undefined;
        request_object_signing_alg?: string | undefined;
        id_token_signed_response_alg?: string | undefined;
        authorization_encrypted_response_enc?: "A128CBC-HS256" | undefined;
        authorization_encrypted_response_alg?: string | undefined;
        client_id?: string | undefined;
        client_name?: string | undefined;
        client_uri?: `http://[::1]${string}` | "http://localhost" | `http://localhost#${string}` | `http://localhost?${string}` | `http://localhost/${string}` | `http://localhost:${string}` | "http://127.0.0.1" | `http://127.0.0.1#${string}` | `http://127.0.0.1?${string}` | `http://127.0.0.1/${string}` | `http://127.0.0.1:${string}` | `https://${string}` | undefined;
        policy_uri?: `http://[::1]${string}` | "http://localhost" | `http://localhost#${string}` | `http://localhost?${string}` | `http://localhost/${string}` | `http://localhost:${string}` | "http://127.0.0.1" | `http://127.0.0.1#${string}` | `http://127.0.0.1?${string}` | `http://127.0.0.1/${string}` | `http://127.0.0.1:${string}` | `https://${string}` | undefined;
        tos_uri?: `http://[::1]${string}` | "http://localhost" | `http://localhost#${string}` | `http://localhost?${string}` | `http://localhost/${string}` | `http://localhost:${string}` | "http://127.0.0.1" | `http://127.0.0.1#${string}` | `http://127.0.0.1?${string}` | `http://127.0.0.1/${string}` | `http://127.0.0.1:${string}` | `https://${string}` | undefined;
        logo_uri?: `http://[::1]${string}` | "http://localhost" | `http://localhost#${string}` | `http://localhost?${string}` | `http://localhost/${string}` | `http://localhost:${string}` | "http://127.0.0.1" | `http://127.0.0.1#${string}` | `http://127.0.0.1?${string}` | `http://127.0.0.1/${string}` | `http://127.0.0.1:${string}` | `https://${string}` | undefined;
        default_max_age?: number | undefined;
        require_auth_time?: boolean | undefined;
        contacts?: string[] | undefined;
        tls_client_certificate_bound_access_tokens?: boolean | undefined;
        dpop_bound_access_tokens?: boolean | undefined;
        authorization_details_types?: string[] | undefined;
    }>;
    readonly clientMetadata: ClientMetadata;
    readonly responseMode: OAuthResponseMode;
    readonly keyset?: Keyset;
    readonly runtime: Runtime;
    readonly fetch: Fetch;
    readonly oauthResolver: OAuthResolver;
    readonly serverFactory: OAuthServerFactory;
    protected readonly sessionGetter: SessionGetter;
    protected readonly stateStore: StateStore;
    constructor(options: OAuthClientOptions);
    get identityResolver(): import("@atproto-labs/identity-resolver").IdentityResolver;
    get jwks(): Readonly<{
        keys: readonly (Readonly<{
            kty: "RSA";
            n: string;
            e: string;
            alg?: "RS256" | "RS384" | "RS512" | "PS256" | "PS384" | "PS512" | undefined;
            kid?: string | undefined;
            use?: "sig" | "enc" | undefined;
            key_ops?: ("verify" | "encrypt" | "wrapKey" | "sign" | "decrypt" | "unwrapKey" | "deriveKey" | "deriveBits")[] | undefined;
            x5c?: string[] | undefined;
            x5t?: string | undefined;
            "x5t#S256"?: string | undefined;
            x5u?: string | undefined;
            ext?: boolean | undefined;
            iat?: number | undefined;
            exp?: number | undefined;
            nbf?: number | undefined;
            revoked?: {
                revoked_at: number;
                reason?: string | undefined;
            } | undefined;
            d?: string | undefined;
            p?: string | undefined;
            q?: string | undefined;
            dp?: string | undefined;
            dq?: string | undefined;
            qi?: string | undefined;
            oth?: {
                d?: string | undefined;
                r?: string | undefined;
                t?: string | undefined;
            }[] | undefined;
        } & {
            kid: NonNullable<unknown>;
        } & {
            d?: never;
        }> | Readonly<{
            kty: "EC";
            crv: "P-256" | "P-384" | "P-521";
            x: string;
            y: string;
            alg?: "ES256" | "ES384" | "ES512" | undefined;
            kid?: string | undefined;
            use?: "sig" | "enc" | undefined;
            key_ops?: ("verify" | "encrypt" | "wrapKey" | "sign" | "decrypt" | "unwrapKey" | "deriveKey" | "deriveBits")[] | undefined;
            x5c?: string[] | undefined;
            x5t?: string | undefined;
            "x5t#S256"?: string | undefined;
            x5u?: string | undefined;
            ext?: boolean | undefined;
            iat?: number | undefined;
            exp?: number | undefined;
            nbf?: number | undefined;
            revoked?: {
                revoked_at: number;
                reason?: string | undefined;
            } | undefined;
            d?: string | undefined;
        } & {
            kid: NonNullable<unknown>;
        } & {
            d?: never;
        }> | Readonly<{
            kty: "EC";
            crv: "secp256k1";
            x: string;
            y: string;
            alg?: "ES256K" | undefined;
            kid?: string | undefined;
            use?: "sig" | "enc" | undefined;
            key_ops?: ("verify" | "encrypt" | "wrapKey" | "sign" | "decrypt" | "unwrapKey" | "deriveKey" | "deriveBits")[] | undefined;
            x5c?: string[] | undefined;
            x5t?: string | undefined;
            "x5t#S256"?: string | undefined;
            x5u?: string | undefined;
            ext?: boolean | undefined;
            iat?: number | undefined;
            exp?: number | undefined;
            nbf?: number | undefined;
            revoked?: {
                revoked_at: number;
                reason?: string | undefined;
            } | undefined;
            d?: string | undefined;
        } & {
            kid: NonNullable<unknown>;
        } & {
            d?: never;
        }> | Readonly<{
            kty: "OKP";
            crv: "Ed25519" | "Ed448";
            x: string;
            alg?: "EdDSA" | undefined;
            kid?: string | undefined;
            use?: "sig" | "enc" | undefined;
            key_ops?: ("verify" | "encrypt" | "wrapKey" | "sign" | "decrypt" | "unwrapKey" | "deriveKey" | "deriveBits")[] | undefined;
            x5c?: string[] | undefined;
            x5t?: string | undefined;
            "x5t#S256"?: string | undefined;
            x5u?: string | undefined;
            ext?: boolean | undefined;
            iat?: number | undefined;
            exp?: number | undefined;
            nbf?: number | undefined;
            revoked?: {
                revoked_at: number;
                reason?: string | undefined;
            } | undefined;
            d?: string | undefined;
        } & {
            kid: NonNullable<unknown>;
        } & {
            d?: never;
        }>)[];
    }>;
    authorize(input: string, { signal, ...options }?: AuthorizeOptions): Promise<URL>;
    /**
     * This method allows the client to proactively revoke the request_uri it
     * created through PAR.
     */
    abortRequest(authorizeUrl: URL): Promise<void>;
    callback(params: URLSearchParams, options?: CallbackOptions): Promise<{
        session: OAuthSession;
        state: string | null;
    }>;
    /**
     * Load a stored session. This will refresh the token only if needed (about to
     * expire) by default.
     *
     * @see {@link SessionGetter.restore}
     */
    restore(sub: string, refresh?: boolean | 'auto'): Promise<OAuthSession>;
    revoke(sub: string): Promise<void>;
    protected createSession(server: OAuthServerAgent, sub: AtprotoDid): OAuthSession;
}
//# sourceMappingURL=oauth-client.d.ts.map