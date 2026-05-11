import { TypeOf, z } from 'zod';
import { OAuthAuthorizationRequestParameters } from '@atproto/oauth-types';
import { Simplify } from './util.js';
export type AuthorizeOptions = Simplify<Omit<OAuthAuthorizationRequestParameters, 'client_id' | 'response_mode' | 'response_type' | 'login_hint' | 'code_challenge' | 'code_challenge_method'> & {
    signal?: AbortSignal;
}>;
export type CallbackOptions = Simplify<Partial<Pick<OAuthAuthorizationRequestParameters, 'redirect_uri'>>>;
export declare const clientMetadataSchema: z.ZodObject<z.objectUtil.extendShape<{
    redirect_uris: z.ZodArray<z.ZodEffects<z.ZodString, `http://[::1]${string}` | "http://127.0.0.1" | `http://127.0.0.1#${string}` | `http://127.0.0.1?${string}` | `http://127.0.0.1/${string}` | `http://127.0.0.1:${string}` | `https://${string}` | `${string}.${string}:/${string}`, string>, "atleastone">;
    response_types: z.ZodDefault<z.ZodArray<z.ZodEnum<["code", "token", "none", "code id_token token", "code id_token", "code token", "id_token token", "id_token"]>, "atleastone">>;
    grant_types: z.ZodDefault<z.ZodArray<z.ZodEnum<["authorization_code", "implicit", "refresh_token", "password", "client_credentials", "urn:ietf:params:oauth:grant-type:jwt-bearer", "urn:ietf:params:oauth:grant-type:saml2-bearer"]>, "atleastone">>;
    scope: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    token_endpoint_auth_method: z.ZodDefault<z.ZodEnum<["client_secret_basic", "client_secret_jwt", "client_secret_post", "none", "private_key_jwt", "self_signed_tls_client_auth", "tls_client_auth"]>>;
    token_endpoint_auth_signing_alg: z.ZodOptional<z.ZodString>;
    userinfo_signed_response_alg: z.ZodOptional<z.ZodString>;
    userinfo_encrypted_response_alg: z.ZodOptional<z.ZodString>;
    jwks_uri: z.ZodOptional<z.ZodEffects<z.ZodString, `http://[::1]${string}` | "http://localhost" | `http://localhost#${string}` | `http://localhost?${string}` | `http://localhost/${string}` | `http://localhost:${string}` | "http://127.0.0.1" | `http://127.0.0.1#${string}` | `http://127.0.0.1?${string}` | `http://127.0.0.1/${string}` | `http://127.0.0.1:${string}` | `https://${string}`, string>>;
    jwks: z.ZodOptional<z.ZodObject<{
        keys: z.ZodEffects<z.ZodArray<z.ZodUnknown, "many">, ((({
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
        })[], unknown[]>;
    }, "strip", z.ZodTypeAny, {
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
    }, {
        keys: unknown[];
    }>>;
    application_type: z.ZodDefault<z.ZodEnum<["web", "native"]>>;
    subject_type: z.ZodDefault<z.ZodEnum<["public", "pairwise"]>>;
    request_object_signing_alg: z.ZodOptional<z.ZodString>;
    id_token_signed_response_alg: z.ZodOptional<z.ZodString>;
    authorization_signed_response_alg: z.ZodDefault<z.ZodString>;
    authorization_encrypted_response_enc: z.ZodOptional<z.ZodEnum<["A128CBC-HS256"]>>;
    authorization_encrypted_response_alg: z.ZodOptional<z.ZodString>;
    client_id: z.ZodOptional<z.ZodString>;
    client_name: z.ZodOptional<z.ZodString>;
    client_uri: z.ZodOptional<z.ZodEffects<z.ZodString, `http://[::1]${string}` | "http://localhost" | `http://localhost#${string}` | `http://localhost?${string}` | `http://localhost/${string}` | `http://localhost:${string}` | "http://127.0.0.1" | `http://127.0.0.1#${string}` | `http://127.0.0.1?${string}` | `http://127.0.0.1/${string}` | `http://127.0.0.1:${string}` | `https://${string}`, string>>;
    policy_uri: z.ZodOptional<z.ZodEffects<z.ZodString, `http://[::1]${string}` | "http://localhost" | `http://localhost#${string}` | `http://localhost?${string}` | `http://localhost/${string}` | `http://localhost:${string}` | "http://127.0.0.1" | `http://127.0.0.1#${string}` | `http://127.0.0.1?${string}` | `http://127.0.0.1/${string}` | `http://127.0.0.1:${string}` | `https://${string}`, string>>;
    tos_uri: z.ZodOptional<z.ZodEffects<z.ZodString, `http://[::1]${string}` | "http://localhost" | `http://localhost#${string}` | `http://localhost?${string}` | `http://localhost/${string}` | `http://localhost:${string}` | "http://127.0.0.1" | `http://127.0.0.1#${string}` | `http://127.0.0.1?${string}` | `http://127.0.0.1/${string}` | `http://127.0.0.1:${string}` | `https://${string}`, string>>;
    logo_uri: z.ZodOptional<z.ZodEffects<z.ZodString, `http://[::1]${string}` | "http://localhost" | `http://localhost#${string}` | `http://localhost?${string}` | `http://localhost/${string}` | `http://localhost:${string}` | "http://127.0.0.1" | `http://127.0.0.1#${string}` | `http://127.0.0.1?${string}` | `http://127.0.0.1/${string}` | `http://127.0.0.1:${string}` | `https://${string}`, string>>;
    default_max_age: z.ZodOptional<z.ZodNumber>;
    require_auth_time: z.ZodOptional<z.ZodBoolean>;
    contacts: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    tls_client_certificate_bound_access_tokens: z.ZodOptional<z.ZodBoolean>;
    dpop_bound_access_tokens: z.ZodOptional<z.ZodBoolean>;
    authorization_details_types: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, {
    client_id: z.ZodUnion<[z.ZodEffects<z.ZodIntersection<z.ZodString, z.ZodEffects<z.ZodEffects<z.ZodString, `${string}:${string}`, string>, `https://${string}`, string>>, `https://${string}/${string}`, string>, z.ZodEffects<z.ZodString, "http://localhost" | `http://localhost?${string}` | "http://localhost/" | `http://localhost/?${string}`, string>]>;
}>, "strip", z.ZodTypeAny, {
    client_id: "http://localhost" | `http://localhost?${string}` | `https://${string}/${string}` | "http://localhost/" | `http://localhost/?${string}`;
    redirect_uris: [`http://[::1]${string}` | "http://127.0.0.1" | `http://127.0.0.1#${string}` | `http://127.0.0.1?${string}` | `http://127.0.0.1/${string}` | `http://127.0.0.1:${string}` | `https://${string}` | `${string}.${string}:/${string}`, ...(`http://[::1]${string}` | "http://127.0.0.1" | `http://127.0.0.1#${string}` | `http://127.0.0.1?${string}` | `http://127.0.0.1/${string}` | `http://127.0.0.1:${string}` | `https://${string}` | `${string}.${string}:/${string}`)[]];
    response_types: ["code" | "none" | "token" | "code id_token token" | "code id_token" | "code token" | "id_token token" | "id_token", ...("code" | "none" | "token" | "code id_token token" | "code id_token" | "code token" | "id_token token" | "id_token")[]];
    grant_types: ["authorization_code" | "implicit" | "refresh_token" | "password" | "client_credentials" | "urn:ietf:params:oauth:grant-type:jwt-bearer" | "urn:ietf:params:oauth:grant-type:saml2-bearer", ...("authorization_code" | "implicit" | "refresh_token" | "password" | "client_credentials" | "urn:ietf:params:oauth:grant-type:jwt-bearer" | "urn:ietf:params:oauth:grant-type:saml2-bearer")[]];
    token_endpoint_auth_method: "none" | "client_secret_basic" | "client_secret_jwt" | "client_secret_post" | "private_key_jwt" | "self_signed_tls_client_auth" | "tls_client_auth";
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
}, {
    client_id: string;
    redirect_uris: [string, ...string[]];
    scope?: string | undefined;
    response_types?: ["code" | "none" | "token" | "code id_token token" | "code id_token" | "code token" | "id_token token" | "id_token", ...("code" | "none" | "token" | "code id_token token" | "code id_token" | "code token" | "id_token token" | "id_token")[]] | undefined;
    grant_types?: ["authorization_code" | "implicit" | "refresh_token" | "password" | "client_credentials" | "urn:ietf:params:oauth:grant-type:jwt-bearer" | "urn:ietf:params:oauth:grant-type:saml2-bearer", ...("authorization_code" | "implicit" | "refresh_token" | "password" | "client_credentials" | "urn:ietf:params:oauth:grant-type:jwt-bearer" | "urn:ietf:params:oauth:grant-type:saml2-bearer")[]] | undefined;
    token_endpoint_auth_method?: "none" | "client_secret_basic" | "client_secret_jwt" | "client_secret_post" | "private_key_jwt" | "self_signed_tls_client_auth" | "tls_client_auth" | undefined;
    token_endpoint_auth_signing_alg?: string | undefined;
    userinfo_signed_response_alg?: string | undefined;
    userinfo_encrypted_response_alg?: string | undefined;
    jwks_uri?: string | undefined;
    jwks?: {
        keys: unknown[];
    } | undefined;
    application_type?: "web" | "native" | undefined;
    subject_type?: "public" | "pairwise" | undefined;
    request_object_signing_alg?: string | undefined;
    id_token_signed_response_alg?: string | undefined;
    authorization_signed_response_alg?: string | undefined;
    authorization_encrypted_response_enc?: "A128CBC-HS256" | undefined;
    authorization_encrypted_response_alg?: string | undefined;
    client_name?: string | undefined;
    client_uri?: string | undefined;
    policy_uri?: string | undefined;
    tos_uri?: string | undefined;
    logo_uri?: string | undefined;
    default_max_age?: number | undefined;
    require_auth_time?: boolean | undefined;
    contacts?: string[] | undefined;
    tls_client_certificate_bound_access_tokens?: boolean | undefined;
    dpop_bound_access_tokens?: boolean | undefined;
    authorization_details_types?: string[] | undefined;
}>;
export type ClientMetadata = TypeOf<typeof clientMetadataSchema>;
//# sourceMappingURL=types.d.ts.map