import { z } from 'zod';
export declare const PUBLIC_KEY_USAGE: readonly ["verify", "encrypt", "wrapKey"];
export declare const publicKeyUsageSchema: z.ZodEnum<["verify", "encrypt", "wrapKey"]>;
export type PublicKeyUsage = (typeof PUBLIC_KEY_USAGE)[number];
export declare function isPublicKeyUsage(usage: unknown): usage is PublicKeyUsage;
/**
 * Determines if the given key usage is consistent for "sig" (signature) public
 * key use.
 */
export declare function isSigKeyUsage(v: KeyUsage): v is "verify";
/**
 * Determines if the given key usage is consistent for "enc" (encryption) public
 * key use.
 *
 * > When a key is used to wrap another key and a public key use
 * > designation for the first key is desired, the "enc" (encryption)
 * > key use value is used, since key wrapping is a kind of encryption.
 * > The "enc" value is also to be used for public keys used for key
 * > agreement operations.
 * @see {@link https://datatracker.ietf.org/doc/html/rfc7517#section-4.2}
 */
export declare function isEncKeyUsage(v: KeyUsage): v is "encrypt" | "wrapKey";
export declare const PRIVATE_KEY_USAGE: readonly ["sign", "decrypt", "unwrapKey", "deriveKey", "deriveBits"];
export declare const privateKeyUsageSchema: z.ZodEnum<["sign", "decrypt", "unwrapKey", "deriveKey", "deriveBits"]>;
export type PrivateKeyUsage = (typeof PRIVATE_KEY_USAGE)[number];
export declare function isPrivateKeyUsage(usage: unknown): usage is PrivateKeyUsage;
export declare const KEY_USAGE: readonly ["sign", "decrypt", "unwrapKey", "deriveKey", "deriveBits", "verify", "encrypt", "wrapKey"];
export declare const keyUsageSchema: z.ZodEnum<["sign", "decrypt", "unwrapKey", "deriveKey", "deriveBits", "verify", "encrypt", "wrapKey"]>;
export type KeyUsage = (typeof KEY_USAGE)[number];
/**
 * @see {@link https://datatracker.ietf.org/doc/html/rfc7517#section-4 JSON Web Key (JWK) Format}
 * @see {@link https://www.iana.org/assignments/jose/jose.xhtml#web-key-parameters IANA "JSON Web Key Parameters" registry}
 */
declare const jwkBaseSchema: z.ZodObject<{
    kty: z.ZodString;
    alg: z.ZodOptional<z.ZodString>;
    kid: z.ZodOptional<z.ZodString>;
    use: z.ZodOptional<z.ZodEnum<["sig", "enc"]>>;
    key_ops: z.ZodOptional<z.ZodEffects<z.ZodArray<z.ZodEnum<["sign", "decrypt", "unwrapKey", "deriveKey", "deriveBits", "verify", "encrypt", "wrapKey"]>, "many">, ("verify" | "encrypt" | "wrapKey" | "sign" | "decrypt" | "unwrapKey" | "deriveKey" | "deriveBits")[], ("verify" | "encrypt" | "wrapKey" | "sign" | "decrypt" | "unwrapKey" | "deriveKey" | "deriveBits")[]>>;
    x5c: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    x5t: z.ZodOptional<z.ZodString>;
    'x5t#S256': z.ZodOptional<z.ZodString>;
    x5u: z.ZodOptional<z.ZodString>;
    ext: z.ZodOptional<z.ZodBoolean>;
    iat: z.ZodOptional<z.ZodNumber>;
    exp: z.ZodOptional<z.ZodNumber>;
    nbf: z.ZodOptional<z.ZodNumber>;
    revoked: z.ZodOptional<z.ZodObject<{
        revoked_at: z.ZodNumber;
        reason: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        revoked_at: number;
        reason?: string | undefined;
    }, {
        revoked_at: number;
        reason?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    kty: string;
    alg?: string | undefined;
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
}, {
    kty: string;
    alg?: string | undefined;
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
}>;
export type JwkBase = z.infer<typeof jwkBaseSchema>;
/**
 * Zod parser for known JWK types
 */
export declare const jwkSchema: z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodObject<z.objectUtil.extendShape<{
    kty: z.ZodString;
    alg: z.ZodOptional<z.ZodString>;
    kid: z.ZodOptional<z.ZodString>;
    use: z.ZodOptional<z.ZodEnum<["sig", "enc"]>>;
    key_ops: z.ZodOptional<z.ZodEffects<z.ZodArray<z.ZodEnum<["sign", "decrypt", "unwrapKey", "deriveKey", "deriveBits", "verify", "encrypt", "wrapKey"]>, "many">, ("verify" | "encrypt" | "wrapKey" | "sign" | "decrypt" | "unwrapKey" | "deriveKey" | "deriveBits")[], ("verify" | "encrypt" | "wrapKey" | "sign" | "decrypt" | "unwrapKey" | "deriveKey" | "deriveBits")[]>>;
    x5c: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    x5t: z.ZodOptional<z.ZodString>;
    'x5t#S256': z.ZodOptional<z.ZodString>;
    x5u: z.ZodOptional<z.ZodString>;
    ext: z.ZodOptional<z.ZodBoolean>;
    iat: z.ZodOptional<z.ZodNumber>;
    exp: z.ZodOptional<z.ZodNumber>;
    nbf: z.ZodOptional<z.ZodNumber>;
    revoked: z.ZodOptional<z.ZodObject<{
        revoked_at: z.ZodNumber;
        reason: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        revoked_at: number;
        reason?: string | undefined;
    }, {
        revoked_at: number;
        reason?: string | undefined;
    }>>;
}, {
    kty: z.ZodLiteral<"RSA">;
    alg: z.ZodOptional<z.ZodEnum<["RS256", "RS384", "RS512", "PS256", "PS384", "PS512"]>>;
    n: z.ZodString;
    e: z.ZodString;
    d: z.ZodOptional<z.ZodString>;
    p: z.ZodOptional<z.ZodString>;
    q: z.ZodOptional<z.ZodString>;
    dp: z.ZodOptional<z.ZodString>;
    dq: z.ZodOptional<z.ZodString>;
    qi: z.ZodOptional<z.ZodString>;
    oth: z.ZodOptional<z.ZodArray<z.ZodObject<{
        r: z.ZodOptional<z.ZodString>;
        d: z.ZodOptional<z.ZodString>;
        t: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        d?: string | undefined;
        r?: string | undefined;
        t?: string | undefined;
    }, {
        d?: string | undefined;
        r?: string | undefined;
        t?: string | undefined;
    }>, "many">>;
}>, "strip", z.ZodTypeAny, {
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
}, {
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
}>, z.ZodObject<z.objectUtil.extendShape<{
    kty: z.ZodString;
    alg: z.ZodOptional<z.ZodString>;
    kid: z.ZodOptional<z.ZodString>;
    use: z.ZodOptional<z.ZodEnum<["sig", "enc"]>>;
    key_ops: z.ZodOptional<z.ZodEffects<z.ZodArray<z.ZodEnum<["sign", "decrypt", "unwrapKey", "deriveKey", "deriveBits", "verify", "encrypt", "wrapKey"]>, "many">, ("verify" | "encrypt" | "wrapKey" | "sign" | "decrypt" | "unwrapKey" | "deriveKey" | "deriveBits")[], ("verify" | "encrypt" | "wrapKey" | "sign" | "decrypt" | "unwrapKey" | "deriveKey" | "deriveBits")[]>>;
    x5c: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    x5t: z.ZodOptional<z.ZodString>;
    'x5t#S256': z.ZodOptional<z.ZodString>;
    x5u: z.ZodOptional<z.ZodString>;
    ext: z.ZodOptional<z.ZodBoolean>;
    iat: z.ZodOptional<z.ZodNumber>;
    exp: z.ZodOptional<z.ZodNumber>;
    nbf: z.ZodOptional<z.ZodNumber>;
    revoked: z.ZodOptional<z.ZodObject<{
        revoked_at: z.ZodNumber;
        reason: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        revoked_at: number;
        reason?: string | undefined;
    }, {
        revoked_at: number;
        reason?: string | undefined;
    }>>;
}, {
    kty: z.ZodLiteral<"EC">;
    alg: z.ZodOptional<z.ZodEnum<["ES256", "ES384", "ES512"]>>;
    crv: z.ZodEnum<["P-256", "P-384", "P-521"]>;
    x: z.ZodString;
    y: z.ZodString;
    d: z.ZodOptional<z.ZodString>;
}>, "strip", z.ZodTypeAny, {
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
}, {
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
}>, z.ZodObject<z.objectUtil.extendShape<{
    kty: z.ZodString;
    alg: z.ZodOptional<z.ZodString>;
    kid: z.ZodOptional<z.ZodString>;
    use: z.ZodOptional<z.ZodEnum<["sig", "enc"]>>;
    key_ops: z.ZodOptional<z.ZodEffects<z.ZodArray<z.ZodEnum<["sign", "decrypt", "unwrapKey", "deriveKey", "deriveBits", "verify", "encrypt", "wrapKey"]>, "many">, ("verify" | "encrypt" | "wrapKey" | "sign" | "decrypt" | "unwrapKey" | "deriveKey" | "deriveBits")[], ("verify" | "encrypt" | "wrapKey" | "sign" | "decrypt" | "unwrapKey" | "deriveKey" | "deriveBits")[]>>;
    x5c: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    x5t: z.ZodOptional<z.ZodString>;
    'x5t#S256': z.ZodOptional<z.ZodString>;
    x5u: z.ZodOptional<z.ZodString>;
    ext: z.ZodOptional<z.ZodBoolean>;
    iat: z.ZodOptional<z.ZodNumber>;
    exp: z.ZodOptional<z.ZodNumber>;
    nbf: z.ZodOptional<z.ZodNumber>;
    revoked: z.ZodOptional<z.ZodObject<{
        revoked_at: z.ZodNumber;
        reason: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        revoked_at: number;
        reason?: string | undefined;
    }, {
        revoked_at: number;
        reason?: string | undefined;
    }>>;
}, {
    kty: z.ZodLiteral<"EC">;
    alg: z.ZodOptional<z.ZodEnum<["ES256K"]>>;
    crv: z.ZodEnum<["secp256k1"]>;
    x: z.ZodString;
    y: z.ZodString;
    d: z.ZodOptional<z.ZodString>;
}>, "strip", z.ZodTypeAny, {
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
}, {
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
}>, z.ZodObject<z.objectUtil.extendShape<{
    kty: z.ZodString;
    alg: z.ZodOptional<z.ZodString>;
    kid: z.ZodOptional<z.ZodString>;
    use: z.ZodOptional<z.ZodEnum<["sig", "enc"]>>;
    key_ops: z.ZodOptional<z.ZodEffects<z.ZodArray<z.ZodEnum<["sign", "decrypt", "unwrapKey", "deriveKey", "deriveBits", "verify", "encrypt", "wrapKey"]>, "many">, ("verify" | "encrypt" | "wrapKey" | "sign" | "decrypt" | "unwrapKey" | "deriveKey" | "deriveBits")[], ("verify" | "encrypt" | "wrapKey" | "sign" | "decrypt" | "unwrapKey" | "deriveKey" | "deriveBits")[]>>;
    x5c: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    x5t: z.ZodOptional<z.ZodString>;
    'x5t#S256': z.ZodOptional<z.ZodString>;
    x5u: z.ZodOptional<z.ZodString>;
    ext: z.ZodOptional<z.ZodBoolean>;
    iat: z.ZodOptional<z.ZodNumber>;
    exp: z.ZodOptional<z.ZodNumber>;
    nbf: z.ZodOptional<z.ZodNumber>;
    revoked: z.ZodOptional<z.ZodObject<{
        revoked_at: z.ZodNumber;
        reason: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        revoked_at: number;
        reason?: string | undefined;
    }, {
        revoked_at: number;
        reason?: string | undefined;
    }>>;
}, {
    kty: z.ZodLiteral<"OKP">;
    alg: z.ZodOptional<z.ZodEnum<["EdDSA"]>>;
    crv: z.ZodEnum<["Ed25519", "Ed448"]>;
    x: z.ZodString;
    d: z.ZodOptional<z.ZodString>;
}>, "strip", z.ZodTypeAny, {
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
}, {
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
}>, z.ZodObject<z.objectUtil.extendShape<{
    kty: z.ZodString;
    alg: z.ZodOptional<z.ZodString>;
    kid: z.ZodOptional<z.ZodString>;
    use: z.ZodOptional<z.ZodEnum<["sig", "enc"]>>;
    key_ops: z.ZodOptional<z.ZodEffects<z.ZodArray<z.ZodEnum<["sign", "decrypt", "unwrapKey", "deriveKey", "deriveBits", "verify", "encrypt", "wrapKey"]>, "many">, ("verify" | "encrypt" | "wrapKey" | "sign" | "decrypt" | "unwrapKey" | "deriveKey" | "deriveBits")[], ("verify" | "encrypt" | "wrapKey" | "sign" | "decrypt" | "unwrapKey" | "deriveKey" | "deriveBits")[]>>;
    x5c: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    x5t: z.ZodOptional<z.ZodString>;
    'x5t#S256': z.ZodOptional<z.ZodString>;
    x5u: z.ZodOptional<z.ZodString>;
    ext: z.ZodOptional<z.ZodBoolean>;
    iat: z.ZodOptional<z.ZodNumber>;
    exp: z.ZodOptional<z.ZodNumber>;
    nbf: z.ZodOptional<z.ZodNumber>;
    revoked: z.ZodOptional<z.ZodObject<{
        revoked_at: z.ZodNumber;
        reason: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        revoked_at: number;
        reason?: string | undefined;
    }, {
        revoked_at: number;
        reason?: string | undefined;
    }>>;
}, {
    kty: z.ZodLiteral<"oct">;
    alg: z.ZodOptional<z.ZodEnum<["HS256", "HS384", "HS512"]>>;
    k: z.ZodString;
}>, "strip", z.ZodTypeAny, {
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
}, {
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
}>]>, {
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
}, {
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
}>, {
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
}, {
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
}>, {
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
}, {
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
}>;
export type Jwk = z.output<typeof jwkSchema>;
/** @deprecated use {@link jwkSchema} instead */
export declare const jwkValidator: z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodObject<z.objectUtil.extendShape<{
    kty: z.ZodString;
    alg: z.ZodOptional<z.ZodString>;
    kid: z.ZodOptional<z.ZodString>;
    use: z.ZodOptional<z.ZodEnum<["sig", "enc"]>>;
    key_ops: z.ZodOptional<z.ZodEffects<z.ZodArray<z.ZodEnum<["sign", "decrypt", "unwrapKey", "deriveKey", "deriveBits", "verify", "encrypt", "wrapKey"]>, "many">, ("verify" | "encrypt" | "wrapKey" | "sign" | "decrypt" | "unwrapKey" | "deriveKey" | "deriveBits")[], ("verify" | "encrypt" | "wrapKey" | "sign" | "decrypt" | "unwrapKey" | "deriveKey" | "deriveBits")[]>>;
    x5c: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    x5t: z.ZodOptional<z.ZodString>;
    'x5t#S256': z.ZodOptional<z.ZodString>;
    x5u: z.ZodOptional<z.ZodString>;
    ext: z.ZodOptional<z.ZodBoolean>;
    iat: z.ZodOptional<z.ZodNumber>;
    exp: z.ZodOptional<z.ZodNumber>;
    nbf: z.ZodOptional<z.ZodNumber>;
    revoked: z.ZodOptional<z.ZodObject<{
        revoked_at: z.ZodNumber;
        reason: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        revoked_at: number;
        reason?: string | undefined;
    }, {
        revoked_at: number;
        reason?: string | undefined;
    }>>;
}, {
    kty: z.ZodLiteral<"RSA">;
    alg: z.ZodOptional<z.ZodEnum<["RS256", "RS384", "RS512", "PS256", "PS384", "PS512"]>>;
    n: z.ZodString;
    e: z.ZodString;
    d: z.ZodOptional<z.ZodString>;
    p: z.ZodOptional<z.ZodString>;
    q: z.ZodOptional<z.ZodString>;
    dp: z.ZodOptional<z.ZodString>;
    dq: z.ZodOptional<z.ZodString>;
    qi: z.ZodOptional<z.ZodString>;
    oth: z.ZodOptional<z.ZodArray<z.ZodObject<{
        r: z.ZodOptional<z.ZodString>;
        d: z.ZodOptional<z.ZodString>;
        t: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        d?: string | undefined;
        r?: string | undefined;
        t?: string | undefined;
    }, {
        d?: string | undefined;
        r?: string | undefined;
        t?: string | undefined;
    }>, "many">>;
}>, "strip", z.ZodTypeAny, {
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
}, {
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
}>, z.ZodObject<z.objectUtil.extendShape<{
    kty: z.ZodString;
    alg: z.ZodOptional<z.ZodString>;
    kid: z.ZodOptional<z.ZodString>;
    use: z.ZodOptional<z.ZodEnum<["sig", "enc"]>>;
    key_ops: z.ZodOptional<z.ZodEffects<z.ZodArray<z.ZodEnum<["sign", "decrypt", "unwrapKey", "deriveKey", "deriveBits", "verify", "encrypt", "wrapKey"]>, "many">, ("verify" | "encrypt" | "wrapKey" | "sign" | "decrypt" | "unwrapKey" | "deriveKey" | "deriveBits")[], ("verify" | "encrypt" | "wrapKey" | "sign" | "decrypt" | "unwrapKey" | "deriveKey" | "deriveBits")[]>>;
    x5c: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    x5t: z.ZodOptional<z.ZodString>;
    'x5t#S256': z.ZodOptional<z.ZodString>;
    x5u: z.ZodOptional<z.ZodString>;
    ext: z.ZodOptional<z.ZodBoolean>;
    iat: z.ZodOptional<z.ZodNumber>;
    exp: z.ZodOptional<z.ZodNumber>;
    nbf: z.ZodOptional<z.ZodNumber>;
    revoked: z.ZodOptional<z.ZodObject<{
        revoked_at: z.ZodNumber;
        reason: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        revoked_at: number;
        reason?: string | undefined;
    }, {
        revoked_at: number;
        reason?: string | undefined;
    }>>;
}, {
    kty: z.ZodLiteral<"EC">;
    alg: z.ZodOptional<z.ZodEnum<["ES256", "ES384", "ES512"]>>;
    crv: z.ZodEnum<["P-256", "P-384", "P-521"]>;
    x: z.ZodString;
    y: z.ZodString;
    d: z.ZodOptional<z.ZodString>;
}>, "strip", z.ZodTypeAny, {
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
}, {
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
}>, z.ZodObject<z.objectUtil.extendShape<{
    kty: z.ZodString;
    alg: z.ZodOptional<z.ZodString>;
    kid: z.ZodOptional<z.ZodString>;
    use: z.ZodOptional<z.ZodEnum<["sig", "enc"]>>;
    key_ops: z.ZodOptional<z.ZodEffects<z.ZodArray<z.ZodEnum<["sign", "decrypt", "unwrapKey", "deriveKey", "deriveBits", "verify", "encrypt", "wrapKey"]>, "many">, ("verify" | "encrypt" | "wrapKey" | "sign" | "decrypt" | "unwrapKey" | "deriveKey" | "deriveBits")[], ("verify" | "encrypt" | "wrapKey" | "sign" | "decrypt" | "unwrapKey" | "deriveKey" | "deriveBits")[]>>;
    x5c: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    x5t: z.ZodOptional<z.ZodString>;
    'x5t#S256': z.ZodOptional<z.ZodString>;
    x5u: z.ZodOptional<z.ZodString>;
    ext: z.ZodOptional<z.ZodBoolean>;
    iat: z.ZodOptional<z.ZodNumber>;
    exp: z.ZodOptional<z.ZodNumber>;
    nbf: z.ZodOptional<z.ZodNumber>;
    revoked: z.ZodOptional<z.ZodObject<{
        revoked_at: z.ZodNumber;
        reason: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        revoked_at: number;
        reason?: string | undefined;
    }, {
        revoked_at: number;
        reason?: string | undefined;
    }>>;
}, {
    kty: z.ZodLiteral<"EC">;
    alg: z.ZodOptional<z.ZodEnum<["ES256K"]>>;
    crv: z.ZodEnum<["secp256k1"]>;
    x: z.ZodString;
    y: z.ZodString;
    d: z.ZodOptional<z.ZodString>;
}>, "strip", z.ZodTypeAny, {
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
}, {
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
}>, z.ZodObject<z.objectUtil.extendShape<{
    kty: z.ZodString;
    alg: z.ZodOptional<z.ZodString>;
    kid: z.ZodOptional<z.ZodString>;
    use: z.ZodOptional<z.ZodEnum<["sig", "enc"]>>;
    key_ops: z.ZodOptional<z.ZodEffects<z.ZodArray<z.ZodEnum<["sign", "decrypt", "unwrapKey", "deriveKey", "deriveBits", "verify", "encrypt", "wrapKey"]>, "many">, ("verify" | "encrypt" | "wrapKey" | "sign" | "decrypt" | "unwrapKey" | "deriveKey" | "deriveBits")[], ("verify" | "encrypt" | "wrapKey" | "sign" | "decrypt" | "unwrapKey" | "deriveKey" | "deriveBits")[]>>;
    x5c: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    x5t: z.ZodOptional<z.ZodString>;
    'x5t#S256': z.ZodOptional<z.ZodString>;
    x5u: z.ZodOptional<z.ZodString>;
    ext: z.ZodOptional<z.ZodBoolean>;
    iat: z.ZodOptional<z.ZodNumber>;
    exp: z.ZodOptional<z.ZodNumber>;
    nbf: z.ZodOptional<z.ZodNumber>;
    revoked: z.ZodOptional<z.ZodObject<{
        revoked_at: z.ZodNumber;
        reason: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        revoked_at: number;
        reason?: string | undefined;
    }, {
        revoked_at: number;
        reason?: string | undefined;
    }>>;
}, {
    kty: z.ZodLiteral<"OKP">;
    alg: z.ZodOptional<z.ZodEnum<["EdDSA"]>>;
    crv: z.ZodEnum<["Ed25519", "Ed448"]>;
    x: z.ZodString;
    d: z.ZodOptional<z.ZodString>;
}>, "strip", z.ZodTypeAny, {
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
}, {
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
}>, z.ZodObject<z.objectUtil.extendShape<{
    kty: z.ZodString;
    alg: z.ZodOptional<z.ZodString>;
    kid: z.ZodOptional<z.ZodString>;
    use: z.ZodOptional<z.ZodEnum<["sig", "enc"]>>;
    key_ops: z.ZodOptional<z.ZodEffects<z.ZodArray<z.ZodEnum<["sign", "decrypt", "unwrapKey", "deriveKey", "deriveBits", "verify", "encrypt", "wrapKey"]>, "many">, ("verify" | "encrypt" | "wrapKey" | "sign" | "decrypt" | "unwrapKey" | "deriveKey" | "deriveBits")[], ("verify" | "encrypt" | "wrapKey" | "sign" | "decrypt" | "unwrapKey" | "deriveKey" | "deriveBits")[]>>;
    x5c: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    x5t: z.ZodOptional<z.ZodString>;
    'x5t#S256': z.ZodOptional<z.ZodString>;
    x5u: z.ZodOptional<z.ZodString>;
    ext: z.ZodOptional<z.ZodBoolean>;
    iat: z.ZodOptional<z.ZodNumber>;
    exp: z.ZodOptional<z.ZodNumber>;
    nbf: z.ZodOptional<z.ZodNumber>;
    revoked: z.ZodOptional<z.ZodObject<{
        revoked_at: z.ZodNumber;
        reason: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        revoked_at: number;
        reason?: string | undefined;
    }, {
        revoked_at: number;
        reason?: string | undefined;
    }>>;
}, {
    kty: z.ZodLiteral<"oct">;
    alg: z.ZodOptional<z.ZodEnum<["HS256", "HS384", "HS512"]>>;
    k: z.ZodString;
}>, "strip", z.ZodTypeAny, {
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
}, {
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
}>]>, {
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
}, {
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
}>, {
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
}, {
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
}>, {
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
}, {
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
}>;
export declare const jwkPubSchema: z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodObject<z.objectUtil.extendShape<{
    kty: z.ZodString;
    alg: z.ZodOptional<z.ZodString>;
    kid: z.ZodOptional<z.ZodString>;
    use: z.ZodOptional<z.ZodEnum<["sig", "enc"]>>;
    key_ops: z.ZodOptional<z.ZodEffects<z.ZodArray<z.ZodEnum<["sign", "decrypt", "unwrapKey", "deriveKey", "deriveBits", "verify", "encrypt", "wrapKey"]>, "many">, ("verify" | "encrypt" | "wrapKey" | "sign" | "decrypt" | "unwrapKey" | "deriveKey" | "deriveBits")[], ("verify" | "encrypt" | "wrapKey" | "sign" | "decrypt" | "unwrapKey" | "deriveKey" | "deriveBits")[]>>;
    x5c: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    x5t: z.ZodOptional<z.ZodString>;
    'x5t#S256': z.ZodOptional<z.ZodString>;
    x5u: z.ZodOptional<z.ZodString>;
    ext: z.ZodOptional<z.ZodBoolean>;
    iat: z.ZodOptional<z.ZodNumber>;
    exp: z.ZodOptional<z.ZodNumber>;
    nbf: z.ZodOptional<z.ZodNumber>;
    revoked: z.ZodOptional<z.ZodObject<{
        revoked_at: z.ZodNumber;
        reason: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        revoked_at: number;
        reason?: string | undefined;
    }, {
        revoked_at: number;
        reason?: string | undefined;
    }>>;
}, {
    kty: z.ZodLiteral<"RSA">;
    alg: z.ZodOptional<z.ZodEnum<["RS256", "RS384", "RS512", "PS256", "PS384", "PS512"]>>;
    n: z.ZodString;
    e: z.ZodString;
    d: z.ZodOptional<z.ZodString>;
    p: z.ZodOptional<z.ZodString>;
    q: z.ZodOptional<z.ZodString>;
    dp: z.ZodOptional<z.ZodString>;
    dq: z.ZodOptional<z.ZodString>;
    qi: z.ZodOptional<z.ZodString>;
    oth: z.ZodOptional<z.ZodArray<z.ZodObject<{
        r: z.ZodOptional<z.ZodString>;
        d: z.ZodOptional<z.ZodString>;
        t: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        d?: string | undefined;
        r?: string | undefined;
        t?: string | undefined;
    }, {
        d?: string | undefined;
        r?: string | undefined;
        t?: string | undefined;
    }>, "many">>;
}>, "strip", z.ZodTypeAny, {
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
}, {
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
}>, z.ZodObject<z.objectUtil.extendShape<{
    kty: z.ZodString;
    alg: z.ZodOptional<z.ZodString>;
    kid: z.ZodOptional<z.ZodString>;
    use: z.ZodOptional<z.ZodEnum<["sig", "enc"]>>;
    key_ops: z.ZodOptional<z.ZodEffects<z.ZodArray<z.ZodEnum<["sign", "decrypt", "unwrapKey", "deriveKey", "deriveBits", "verify", "encrypt", "wrapKey"]>, "many">, ("verify" | "encrypt" | "wrapKey" | "sign" | "decrypt" | "unwrapKey" | "deriveKey" | "deriveBits")[], ("verify" | "encrypt" | "wrapKey" | "sign" | "decrypt" | "unwrapKey" | "deriveKey" | "deriveBits")[]>>;
    x5c: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    x5t: z.ZodOptional<z.ZodString>;
    'x5t#S256': z.ZodOptional<z.ZodString>;
    x5u: z.ZodOptional<z.ZodString>;
    ext: z.ZodOptional<z.ZodBoolean>;
    iat: z.ZodOptional<z.ZodNumber>;
    exp: z.ZodOptional<z.ZodNumber>;
    nbf: z.ZodOptional<z.ZodNumber>;
    revoked: z.ZodOptional<z.ZodObject<{
        revoked_at: z.ZodNumber;
        reason: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        revoked_at: number;
        reason?: string | undefined;
    }, {
        revoked_at: number;
        reason?: string | undefined;
    }>>;
}, {
    kty: z.ZodLiteral<"EC">;
    alg: z.ZodOptional<z.ZodEnum<["ES256", "ES384", "ES512"]>>;
    crv: z.ZodEnum<["P-256", "P-384", "P-521"]>;
    x: z.ZodString;
    y: z.ZodString;
    d: z.ZodOptional<z.ZodString>;
}>, "strip", z.ZodTypeAny, {
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
}, {
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
}>, z.ZodObject<z.objectUtil.extendShape<{
    kty: z.ZodString;
    alg: z.ZodOptional<z.ZodString>;
    kid: z.ZodOptional<z.ZodString>;
    use: z.ZodOptional<z.ZodEnum<["sig", "enc"]>>;
    key_ops: z.ZodOptional<z.ZodEffects<z.ZodArray<z.ZodEnum<["sign", "decrypt", "unwrapKey", "deriveKey", "deriveBits", "verify", "encrypt", "wrapKey"]>, "many">, ("verify" | "encrypt" | "wrapKey" | "sign" | "decrypt" | "unwrapKey" | "deriveKey" | "deriveBits")[], ("verify" | "encrypt" | "wrapKey" | "sign" | "decrypt" | "unwrapKey" | "deriveKey" | "deriveBits")[]>>;
    x5c: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    x5t: z.ZodOptional<z.ZodString>;
    'x5t#S256': z.ZodOptional<z.ZodString>;
    x5u: z.ZodOptional<z.ZodString>;
    ext: z.ZodOptional<z.ZodBoolean>;
    iat: z.ZodOptional<z.ZodNumber>;
    exp: z.ZodOptional<z.ZodNumber>;
    nbf: z.ZodOptional<z.ZodNumber>;
    revoked: z.ZodOptional<z.ZodObject<{
        revoked_at: z.ZodNumber;
        reason: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        revoked_at: number;
        reason?: string | undefined;
    }, {
        revoked_at: number;
        reason?: string | undefined;
    }>>;
}, {
    kty: z.ZodLiteral<"EC">;
    alg: z.ZodOptional<z.ZodEnum<["ES256K"]>>;
    crv: z.ZodEnum<["secp256k1"]>;
    x: z.ZodString;
    y: z.ZodString;
    d: z.ZodOptional<z.ZodString>;
}>, "strip", z.ZodTypeAny, {
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
}, {
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
}>, z.ZodObject<z.objectUtil.extendShape<{
    kty: z.ZodString;
    alg: z.ZodOptional<z.ZodString>;
    kid: z.ZodOptional<z.ZodString>;
    use: z.ZodOptional<z.ZodEnum<["sig", "enc"]>>;
    key_ops: z.ZodOptional<z.ZodEffects<z.ZodArray<z.ZodEnum<["sign", "decrypt", "unwrapKey", "deriveKey", "deriveBits", "verify", "encrypt", "wrapKey"]>, "many">, ("verify" | "encrypt" | "wrapKey" | "sign" | "decrypt" | "unwrapKey" | "deriveKey" | "deriveBits")[], ("verify" | "encrypt" | "wrapKey" | "sign" | "decrypt" | "unwrapKey" | "deriveKey" | "deriveBits")[]>>;
    x5c: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    x5t: z.ZodOptional<z.ZodString>;
    'x5t#S256': z.ZodOptional<z.ZodString>;
    x5u: z.ZodOptional<z.ZodString>;
    ext: z.ZodOptional<z.ZodBoolean>;
    iat: z.ZodOptional<z.ZodNumber>;
    exp: z.ZodOptional<z.ZodNumber>;
    nbf: z.ZodOptional<z.ZodNumber>;
    revoked: z.ZodOptional<z.ZodObject<{
        revoked_at: z.ZodNumber;
        reason: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        revoked_at: number;
        reason?: string | undefined;
    }, {
        revoked_at: number;
        reason?: string | undefined;
    }>>;
}, {
    kty: z.ZodLiteral<"OKP">;
    alg: z.ZodOptional<z.ZodEnum<["EdDSA"]>>;
    crv: z.ZodEnum<["Ed25519", "Ed448"]>;
    x: z.ZodString;
    d: z.ZodOptional<z.ZodString>;
}>, "strip", z.ZodTypeAny, {
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
}, {
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
}>, z.ZodObject<z.objectUtil.extendShape<{
    kty: z.ZodString;
    alg: z.ZodOptional<z.ZodString>;
    kid: z.ZodOptional<z.ZodString>;
    use: z.ZodOptional<z.ZodEnum<["sig", "enc"]>>;
    key_ops: z.ZodOptional<z.ZodEffects<z.ZodArray<z.ZodEnum<["sign", "decrypt", "unwrapKey", "deriveKey", "deriveBits", "verify", "encrypt", "wrapKey"]>, "many">, ("verify" | "encrypt" | "wrapKey" | "sign" | "decrypt" | "unwrapKey" | "deriveKey" | "deriveBits")[], ("verify" | "encrypt" | "wrapKey" | "sign" | "decrypt" | "unwrapKey" | "deriveKey" | "deriveBits")[]>>;
    x5c: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    x5t: z.ZodOptional<z.ZodString>;
    'x5t#S256': z.ZodOptional<z.ZodString>;
    x5u: z.ZodOptional<z.ZodString>;
    ext: z.ZodOptional<z.ZodBoolean>;
    iat: z.ZodOptional<z.ZodNumber>;
    exp: z.ZodOptional<z.ZodNumber>;
    nbf: z.ZodOptional<z.ZodNumber>;
    revoked: z.ZodOptional<z.ZodObject<{
        revoked_at: z.ZodNumber;
        reason: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        revoked_at: number;
        reason?: string | undefined;
    }, {
        revoked_at: number;
        reason?: string | undefined;
    }>>;
}, {
    kty: z.ZodLiteral<"oct">;
    alg: z.ZodOptional<z.ZodEnum<["HS256", "HS384", "HS512"]>>;
    k: z.ZodString;
}>, "strip", z.ZodTypeAny, {
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
}, {
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
}>]>, {
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
}, {
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
}>, {
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
}, {
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
}>, {
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
}, {
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
}>, ({
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
}) & {
    kid: NonNullable<unknown>;
}, {
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
}>, (({
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
}, {
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
}>, (({
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
}, {
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
}>;
export type PublicJwk = z.output<typeof jwkPubSchema>;
export declare const jwkPrivateSchema: z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodObject<z.objectUtil.extendShape<{
    kty: z.ZodString;
    alg: z.ZodOptional<z.ZodString>;
    kid: z.ZodOptional<z.ZodString>;
    use: z.ZodOptional<z.ZodEnum<["sig", "enc"]>>;
    key_ops: z.ZodOptional<z.ZodEffects<z.ZodArray<z.ZodEnum<["sign", "decrypt", "unwrapKey", "deriveKey", "deriveBits", "verify", "encrypt", "wrapKey"]>, "many">, ("verify" | "encrypt" | "wrapKey" | "sign" | "decrypt" | "unwrapKey" | "deriveKey" | "deriveBits")[], ("verify" | "encrypt" | "wrapKey" | "sign" | "decrypt" | "unwrapKey" | "deriveKey" | "deriveBits")[]>>;
    x5c: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    x5t: z.ZodOptional<z.ZodString>;
    'x5t#S256': z.ZodOptional<z.ZodString>;
    x5u: z.ZodOptional<z.ZodString>;
    ext: z.ZodOptional<z.ZodBoolean>;
    iat: z.ZodOptional<z.ZodNumber>;
    exp: z.ZodOptional<z.ZodNumber>;
    nbf: z.ZodOptional<z.ZodNumber>;
    revoked: z.ZodOptional<z.ZodObject<{
        revoked_at: z.ZodNumber;
        reason: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        revoked_at: number;
        reason?: string | undefined;
    }, {
        revoked_at: number;
        reason?: string | undefined;
    }>>;
}, {
    kty: z.ZodLiteral<"RSA">;
    alg: z.ZodOptional<z.ZodEnum<["RS256", "RS384", "RS512", "PS256", "PS384", "PS512"]>>;
    n: z.ZodString;
    e: z.ZodString;
    d: z.ZodOptional<z.ZodString>;
    p: z.ZodOptional<z.ZodString>;
    q: z.ZodOptional<z.ZodString>;
    dp: z.ZodOptional<z.ZodString>;
    dq: z.ZodOptional<z.ZodString>;
    qi: z.ZodOptional<z.ZodString>;
    oth: z.ZodOptional<z.ZodArray<z.ZodObject<{
        r: z.ZodOptional<z.ZodString>;
        d: z.ZodOptional<z.ZodString>;
        t: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        d?: string | undefined;
        r?: string | undefined;
        t?: string | undefined;
    }, {
        d?: string | undefined;
        r?: string | undefined;
        t?: string | undefined;
    }>, "many">>;
}>, "strip", z.ZodTypeAny, {
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
}, {
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
}>, z.ZodObject<z.objectUtil.extendShape<{
    kty: z.ZodString;
    alg: z.ZodOptional<z.ZodString>;
    kid: z.ZodOptional<z.ZodString>;
    use: z.ZodOptional<z.ZodEnum<["sig", "enc"]>>;
    key_ops: z.ZodOptional<z.ZodEffects<z.ZodArray<z.ZodEnum<["sign", "decrypt", "unwrapKey", "deriveKey", "deriveBits", "verify", "encrypt", "wrapKey"]>, "many">, ("verify" | "encrypt" | "wrapKey" | "sign" | "decrypt" | "unwrapKey" | "deriveKey" | "deriveBits")[], ("verify" | "encrypt" | "wrapKey" | "sign" | "decrypt" | "unwrapKey" | "deriveKey" | "deriveBits")[]>>;
    x5c: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    x5t: z.ZodOptional<z.ZodString>;
    'x5t#S256': z.ZodOptional<z.ZodString>;
    x5u: z.ZodOptional<z.ZodString>;
    ext: z.ZodOptional<z.ZodBoolean>;
    iat: z.ZodOptional<z.ZodNumber>;
    exp: z.ZodOptional<z.ZodNumber>;
    nbf: z.ZodOptional<z.ZodNumber>;
    revoked: z.ZodOptional<z.ZodObject<{
        revoked_at: z.ZodNumber;
        reason: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        revoked_at: number;
        reason?: string | undefined;
    }, {
        revoked_at: number;
        reason?: string | undefined;
    }>>;
}, {
    kty: z.ZodLiteral<"EC">;
    alg: z.ZodOptional<z.ZodEnum<["ES256", "ES384", "ES512"]>>;
    crv: z.ZodEnum<["P-256", "P-384", "P-521"]>;
    x: z.ZodString;
    y: z.ZodString;
    d: z.ZodOptional<z.ZodString>;
}>, "strip", z.ZodTypeAny, {
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
}, {
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
}>, z.ZodObject<z.objectUtil.extendShape<{
    kty: z.ZodString;
    alg: z.ZodOptional<z.ZodString>;
    kid: z.ZodOptional<z.ZodString>;
    use: z.ZodOptional<z.ZodEnum<["sig", "enc"]>>;
    key_ops: z.ZodOptional<z.ZodEffects<z.ZodArray<z.ZodEnum<["sign", "decrypt", "unwrapKey", "deriveKey", "deriveBits", "verify", "encrypt", "wrapKey"]>, "many">, ("verify" | "encrypt" | "wrapKey" | "sign" | "decrypt" | "unwrapKey" | "deriveKey" | "deriveBits")[], ("verify" | "encrypt" | "wrapKey" | "sign" | "decrypt" | "unwrapKey" | "deriveKey" | "deriveBits")[]>>;
    x5c: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    x5t: z.ZodOptional<z.ZodString>;
    'x5t#S256': z.ZodOptional<z.ZodString>;
    x5u: z.ZodOptional<z.ZodString>;
    ext: z.ZodOptional<z.ZodBoolean>;
    iat: z.ZodOptional<z.ZodNumber>;
    exp: z.ZodOptional<z.ZodNumber>;
    nbf: z.ZodOptional<z.ZodNumber>;
    revoked: z.ZodOptional<z.ZodObject<{
        revoked_at: z.ZodNumber;
        reason: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        revoked_at: number;
        reason?: string | undefined;
    }, {
        revoked_at: number;
        reason?: string | undefined;
    }>>;
}, {
    kty: z.ZodLiteral<"EC">;
    alg: z.ZodOptional<z.ZodEnum<["ES256K"]>>;
    crv: z.ZodEnum<["secp256k1"]>;
    x: z.ZodString;
    y: z.ZodString;
    d: z.ZodOptional<z.ZodString>;
}>, "strip", z.ZodTypeAny, {
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
}, {
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
}>, z.ZodObject<z.objectUtil.extendShape<{
    kty: z.ZodString;
    alg: z.ZodOptional<z.ZodString>;
    kid: z.ZodOptional<z.ZodString>;
    use: z.ZodOptional<z.ZodEnum<["sig", "enc"]>>;
    key_ops: z.ZodOptional<z.ZodEffects<z.ZodArray<z.ZodEnum<["sign", "decrypt", "unwrapKey", "deriveKey", "deriveBits", "verify", "encrypt", "wrapKey"]>, "many">, ("verify" | "encrypt" | "wrapKey" | "sign" | "decrypt" | "unwrapKey" | "deriveKey" | "deriveBits")[], ("verify" | "encrypt" | "wrapKey" | "sign" | "decrypt" | "unwrapKey" | "deriveKey" | "deriveBits")[]>>;
    x5c: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    x5t: z.ZodOptional<z.ZodString>;
    'x5t#S256': z.ZodOptional<z.ZodString>;
    x5u: z.ZodOptional<z.ZodString>;
    ext: z.ZodOptional<z.ZodBoolean>;
    iat: z.ZodOptional<z.ZodNumber>;
    exp: z.ZodOptional<z.ZodNumber>;
    nbf: z.ZodOptional<z.ZodNumber>;
    revoked: z.ZodOptional<z.ZodObject<{
        revoked_at: z.ZodNumber;
        reason: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        revoked_at: number;
        reason?: string | undefined;
    }, {
        revoked_at: number;
        reason?: string | undefined;
    }>>;
}, {
    kty: z.ZodLiteral<"OKP">;
    alg: z.ZodOptional<z.ZodEnum<["EdDSA"]>>;
    crv: z.ZodEnum<["Ed25519", "Ed448"]>;
    x: z.ZodString;
    d: z.ZodOptional<z.ZodString>;
}>, "strip", z.ZodTypeAny, {
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
}, {
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
}>, z.ZodObject<z.objectUtil.extendShape<{
    kty: z.ZodString;
    alg: z.ZodOptional<z.ZodString>;
    kid: z.ZodOptional<z.ZodString>;
    use: z.ZodOptional<z.ZodEnum<["sig", "enc"]>>;
    key_ops: z.ZodOptional<z.ZodEffects<z.ZodArray<z.ZodEnum<["sign", "decrypt", "unwrapKey", "deriveKey", "deriveBits", "verify", "encrypt", "wrapKey"]>, "many">, ("verify" | "encrypt" | "wrapKey" | "sign" | "decrypt" | "unwrapKey" | "deriveKey" | "deriveBits")[], ("verify" | "encrypt" | "wrapKey" | "sign" | "decrypt" | "unwrapKey" | "deriveKey" | "deriveBits")[]>>;
    x5c: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    x5t: z.ZodOptional<z.ZodString>;
    'x5t#S256': z.ZodOptional<z.ZodString>;
    x5u: z.ZodOptional<z.ZodString>;
    ext: z.ZodOptional<z.ZodBoolean>;
    iat: z.ZodOptional<z.ZodNumber>;
    exp: z.ZodOptional<z.ZodNumber>;
    nbf: z.ZodOptional<z.ZodNumber>;
    revoked: z.ZodOptional<z.ZodObject<{
        revoked_at: z.ZodNumber;
        reason: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        revoked_at: number;
        reason?: string | undefined;
    }, {
        revoked_at: number;
        reason?: string | undefined;
    }>>;
}, {
    kty: z.ZodLiteral<"oct">;
    alg: z.ZodOptional<z.ZodEnum<["HS256", "HS384", "HS512"]>>;
    k: z.ZodString;
}>, "strip", z.ZodTypeAny, {
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
}, {
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
}>]>, {
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
}, {
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
}>, {
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
}, {
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
}>, {
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
}, {
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
}>, (({
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
}) & {
    d: NonNullable<unknown>;
}) | (({
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
}) & {
    k: NonNullable<unknown>;
}), {
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
}>;
export type PrivateJwk = z.output<typeof jwkPrivateSchema>;
export declare function hasKid<J extends object>(jwk: J): jwk is J & {
    kid: NonNullable<unknown>;
};
export declare function hasSharedSecretJwk<J extends object>(jwk: J): jwk is J & {
    k: NonNullable<unknown>;
};
export declare function hasPrivateSecretJwk<J extends object>(jwk: J): jwk is J & {
    d: NonNullable<unknown>;
};
export declare function isPrivateJwk<J extends object>(jwk: J): jwk is (J & {
    d: NonNullable<unknown>;
}) | (J & {
    k: NonNullable<unknown>;
});
export declare function isPublicJwk<J extends object>(jwk: J): jwk is Extract<Exclude<J, {
    k: NonNullable<unknown>;
}>, {
    d?: NonNullable<unknown>;
}> & {
    d?: never;
};
export {};
//# sourceMappingURL=jwk.d.ts.map