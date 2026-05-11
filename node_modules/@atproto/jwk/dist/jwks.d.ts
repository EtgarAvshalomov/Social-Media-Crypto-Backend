import { z } from 'zod';
/**
 * JSON Web Key Set schema. The keys set, in this context, represents a
 * collection of JSON Web Keys (JWKs), that can be both public and private.
 */
export declare const jwksSchema: z.ZodObject<{
    keys: z.ZodEffects<z.ZodArray<z.ZodUnknown, "many">, ({
        kty: "RSA";
        n: string;
        e: string;
        alg?: "RS256" | "RS384" | "RS512" | "PS256" | "PS384" | "PS512" | undefined;
        kid?: string | undefined;
        use?: "sig" | "enc" | undefined;
        key_ops?: ("verify" | "encrypt" | "wrapKey" | "sign" | "decrypt" | "unwrapKey" | "deriveKey" | "deriveBits")[] | undefined;
        x5c?: string[] | undefined;
        x5t?: string | undefined;
        'x5t#S256'?: string | undefined;
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
    } | {
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
        'x5t#S256'?: string | undefined;
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
    } | {
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
        'x5t#S256'?: string | undefined;
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
    } | {
        kty: "OKP";
        crv: "Ed25519" | "Ed448";
        x: string;
        alg?: "EdDSA" | undefined;
        kid?: string | undefined;
        use?: "sig" | "enc" | undefined;
        key_ops?: ("verify" | "encrypt" | "wrapKey" | "sign" | "decrypt" | "unwrapKey" | "deriveKey" | "deriveBits")[] | undefined;
        x5c?: string[] | undefined;
        x5t?: string | undefined;
        'x5t#S256'?: string | undefined;
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
    } | {
        kty: "oct";
        k: string;
        alg?: "HS256" | "HS384" | "HS512" | undefined;
        kid?: string | undefined;
        use?: "sig" | "enc" | undefined;
        key_ops?: ("verify" | "encrypt" | "wrapKey" | "sign" | "decrypt" | "unwrapKey" | "deriveKey" | "deriveBits")[] | undefined;
        x5c?: string[] | undefined;
        x5t?: string | undefined;
        'x5t#S256'?: string | undefined;
        x5u?: string | undefined;
        ext?: boolean | undefined;
        iat?: number | undefined;
        exp?: number | undefined;
        nbf?: number | undefined;
        revoked?: {
            revoked_at: number;
            reason?: string | undefined;
        } | undefined;
    })[], unknown[]>;
}, "strip", z.ZodTypeAny, {
    keys: ({
        kty: "RSA";
        n: string;
        e: string;
        alg?: "RS256" | "RS384" | "RS512" | "PS256" | "PS384" | "PS512" | undefined;
        kid?: string | undefined;
        use?: "sig" | "enc" | undefined;
        key_ops?: ("verify" | "encrypt" | "wrapKey" | "sign" | "decrypt" | "unwrapKey" | "deriveKey" | "deriveBits")[] | undefined;
        x5c?: string[] | undefined;
        x5t?: string | undefined;
        'x5t#S256'?: string | undefined;
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
    } | {
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
        'x5t#S256'?: string | undefined;
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
    } | {
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
        'x5t#S256'?: string | undefined;
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
    } | {
        kty: "OKP";
        crv: "Ed25519" | "Ed448";
        x: string;
        alg?: "EdDSA" | undefined;
        kid?: string | undefined;
        use?: "sig" | "enc" | undefined;
        key_ops?: ("verify" | "encrypt" | "wrapKey" | "sign" | "decrypt" | "unwrapKey" | "deriveKey" | "deriveBits")[] | undefined;
        x5c?: string[] | undefined;
        x5t?: string | undefined;
        'x5t#S256'?: string | undefined;
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
    } | {
        kty: "oct";
        k: string;
        alg?: "HS256" | "HS384" | "HS512" | undefined;
        kid?: string | undefined;
        use?: "sig" | "enc" | undefined;
        key_ops?: ("verify" | "encrypt" | "wrapKey" | "sign" | "decrypt" | "unwrapKey" | "deriveKey" | "deriveBits")[] | undefined;
        x5c?: string[] | undefined;
        x5t?: string | undefined;
        'x5t#S256'?: string | undefined;
        x5u?: string | undefined;
        ext?: boolean | undefined;
        iat?: number | undefined;
        exp?: number | undefined;
        nbf?: number | undefined;
        revoked?: {
            revoked_at: number;
            reason?: string | undefined;
        } | undefined;
    })[];
}, {
    keys: unknown[];
}>;
export type Jwks = z.output<typeof jwksSchema>;
/**
 * Public JSON Web Key Set schema.
 */
export declare const jwksPubSchema: z.ZodObject<{
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
        'x5t#S256'?: string | undefined;
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
        'x5t#S256'?: string | undefined;
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
        'x5t#S256'?: string | undefined;
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
        'x5t#S256'?: string | undefined;
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
        'x5t#S256'?: string | undefined;
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
        'x5t#S256'?: string | undefined;
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
        'x5t#S256'?: string | undefined;
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
        'x5t#S256'?: string | undefined;
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
}>;
export type JwksPub = z.output<typeof jwksPubSchema>;
//# sourceMappingURL=jwks.d.ts.map