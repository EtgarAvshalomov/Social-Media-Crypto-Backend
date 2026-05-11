"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwkPrivateSchema = exports.jwkPubSchema = exports.jwkValidator = exports.jwkSchema = exports.keyUsageSchema = exports.KEY_USAGE = exports.privateKeyUsageSchema = exports.PRIVATE_KEY_USAGE = exports.publicKeyUsageSchema = exports.PUBLIC_KEY_USAGE = void 0;
exports.isPublicKeyUsage = isPublicKeyUsage;
exports.isSigKeyUsage = isSigKeyUsage;
exports.isEncKeyUsage = isEncKeyUsage;
exports.isPrivateKeyUsage = isPrivateKeyUsage;
exports.hasKid = hasKid;
exports.hasSharedSecretJwk = hasSharedSecretJwk;
exports.hasPrivateSecretJwk = hasPrivateSecretJwk;
exports.isPrivateJwk = isPrivateJwk;
exports.isPublicJwk = isPublicJwk;
const zod_1 = require("zod");
const util_1 = require("./util");
exports.PUBLIC_KEY_USAGE = ['verify', 'encrypt', 'wrapKey'];
exports.publicKeyUsageSchema = zod_1.z.enum(exports.PUBLIC_KEY_USAGE);
function isPublicKeyUsage(usage) {
    return exports.PUBLIC_KEY_USAGE.includes(usage);
}
/**
 * Determines if the given key usage is consistent for "sig" (signature) public
 * key use.
 */
function isSigKeyUsage(v) {
    return v === 'verify';
}
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
function isEncKeyUsage(v) {
    return v === 'encrypt' || v === 'wrapKey';
}
exports.PRIVATE_KEY_USAGE = [
    'sign',
    'decrypt',
    'unwrapKey',
    'deriveKey',
    'deriveBits',
];
exports.privateKeyUsageSchema = zod_1.z.enum(exports.PRIVATE_KEY_USAGE);
function isPrivateKeyUsage(usage) {
    return exports.PRIVATE_KEY_USAGE.includes(usage);
}
exports.KEY_USAGE = [...exports.PRIVATE_KEY_USAGE, ...exports.PUBLIC_KEY_USAGE];
exports.keyUsageSchema = zod_1.z.enum(exports.KEY_USAGE);
/**
 * @see {@link https://datatracker.ietf.org/doc/html/rfc7517#section-4 JSON Web Key (JWK) Format}
 * @see {@link https://www.iana.org/assignments/jose/jose.xhtml#web-key-parameters IANA "JSON Web Key Parameters" registry}
 */
const jwkBaseSchema = zod_1.z.object({
    kty: zod_1.z.string().min(1),
    alg: zod_1.z.string().min(1).optional(),
    kid: zod_1.z.string().min(1).optional(),
    use: zod_1.z.enum(['sig', 'enc']).optional(),
    key_ops: zod_1.z
        .array(exports.keyUsageSchema)
        .min(1, { message: 'At least one key usage must be specified' })
        // https://datatracker.ietf.org/doc/html/rfc7517#section-4.3
        // > Duplicate key operation values MUST NOT be present in the array.
        .refine((ops) => ops.every(util_1.isLastOccurrence), {
        message: 'key_ops must not contain duplicates',
    })
        .optional(),
    x5c: zod_1.z.array(zod_1.z.string()).optional(), // X.509 Certificate Chain
    x5t: zod_1.z.string().min(1).optional(), // X.509 Certificate SHA-1 Thumbprint
    'x5t#S256': zod_1.z.string().min(1).optional(), // X.509 Certificate SHA-256 Thumbprint
    x5u: zod_1.z.string().url().optional(), // X.509 URL
    // https://www.w3.org/TR/webcrypto/
    ext: zod_1.z.boolean().optional(), // Extractable
    // Federation Historical Keys Response
    // https://openid.net/specs/openid-federation-1_0.html#name-federation-historical-keys-res
    iat: zod_1.z.number().int().optional(), // Issued At (timestamp)
    exp: zod_1.z.number().int().optional(), // Expiration Time (timestamp)
    nbf: zod_1.z.number().int().optional(), // Not Before (timestamp)
    revoked: zod_1.z //  properties of the revocation
        .object({
        revoked_at: zod_1.z.number().int(),
        reason: zod_1.z.string().optional(),
    })
        .optional(),
});
const jwkRsaKeySchema = jwkBaseSchema.extend({
    kty: zod_1.z.literal('RSA'),
    alg: zod_1.z
        .enum(['RS256', 'RS384', 'RS512', 'PS256', 'PS384', 'PS512'])
        .optional(),
    n: zod_1.z.string().min(1), // Modulus
    e: zod_1.z.string().min(1), // Exponent
    d: zod_1.z.string().min(1).optional(), // Private Exponent
    p: zod_1.z.string().min(1).optional(), // First Prime Factor
    q: zod_1.z.string().min(1).optional(), // Second Prime Factor
    dp: zod_1.z.string().min(1).optional(), // First Factor CRT Exponent
    dq: zod_1.z.string().min(1).optional(), // Second Factor CRT Exponent
    qi: zod_1.z.string().min(1).optional(), // First CRT Coefficient
    oth: zod_1.z
        .array(zod_1.z.object({
        r: zod_1.z.string().optional(),
        d: zod_1.z.string().optional(),
        t: zod_1.z.string().optional(),
    }))
        .min(1)
        .optional(), // Other Primes Info
});
const jwkEcKeySchema = jwkBaseSchema.extend({
    kty: zod_1.z.literal('EC'),
    alg: zod_1.z.enum(['ES256', 'ES384', 'ES512']).optional(),
    crv: zod_1.z.enum(['P-256', 'P-384', 'P-521']),
    x: zod_1.z.string().min(1),
    y: zod_1.z.string().min(1),
    d: zod_1.z.string().min(1).optional(), // ECC Private Key
});
const jwkEcSecp256k1KeySchema = jwkBaseSchema.extend({
    kty: zod_1.z.literal('EC'),
    alg: zod_1.z.enum(['ES256K']).optional(),
    crv: zod_1.z.enum(['secp256k1']),
    x: zod_1.z.string().min(1),
    y: zod_1.z.string().min(1),
    d: zod_1.z.string().min(1).optional(), // ECC Private Key
});
const jwkOkpKeySchema = jwkBaseSchema.extend({
    kty: zod_1.z.literal('OKP'),
    alg: zod_1.z.enum(['EdDSA']).optional(),
    crv: zod_1.z.enum(['Ed25519', 'Ed448']),
    x: zod_1.z.string().min(1),
    d: zod_1.z.string().min(1).optional(), // ECC Private Key
});
const jwkSymKeySchema = jwkBaseSchema.extend({
    kty: zod_1.z.literal('oct'), // Octet Sequence (used to represent symmetric keys)
    alg: zod_1.z.enum(['HS256', 'HS384', 'HS512']).optional(),
    k: zod_1.z.string(), // Key Value (base64url encoded)
});
/**
 * Zod parser for known JWK types
 */
exports.jwkSchema = zod_1.z
    .union([
    jwkRsaKeySchema,
    jwkEcKeySchema,
    jwkEcSecp256k1KeySchema,
    jwkOkpKeySchema,
    jwkSymKeySchema,
])
    // @TODO These rules should be applied to jwkBaseSchema, but Zod 3 doesn't
    // support extending refined schemas. Move these to the base schema when we
    // upgrade to Zod 4.
    .refine(
// https://datatracker.ietf.org/doc/html/rfc7517#section-4.2
// > The "use" (public key use) parameter identifies the intended use of the
// > public key
(k) => k.use == null || isPublicJwk(k), {
    message: '"use" can only be used with public keys',
    path: ['use'],
})
    .refine((k) => !k.key_ops?.some(isPrivateKeyUsage) || isPrivateJwk(k), {
    message: 'private key usage not allowed for public keys',
    path: ['key_ops'],
})
    .refine(
// https://datatracker.ietf.org/doc/html/rfc7517#section-4.3
// > The "use" and "key_ops" JWK members SHOULD NOT be used together;
// > however, if both are used, the information they convey MUST be
// > consistent.
(k) => k.use == null ||
    k.key_ops == null ||
    (k.use === 'sig' && k.key_ops.every(isSigKeyUsage)) ||
    (k.use === 'enc' && k.key_ops.every(isEncKeyUsage)), {
    message: '"key_ops" must be consistent with "use"',
    path: ['key_ops'],
});
/** @deprecated use {@link jwkSchema} instead */
exports.jwkValidator = exports.jwkSchema;
exports.jwkPubSchema = exports.jwkSchema
    .refine(hasKid, {
    message: '"kid" is required',
    path: ['kid'],
})
    // @NOTE for legacy reasons, we don't impose the presence of either "use" or "key_ops"
    .refine(isPublicJwk, {
    message: 'private key not allowed',
})
    .refine((k) => !k.key_ops || k.key_ops.every(isPublicKeyUsage), {
    message: '"key_ops" must not contain private key usage for public keys',
    path: ['key_ops'],
});
exports.jwkPrivateSchema = exports.jwkSchema
    // @NOTE we don't impose the presence of "kid"
    .refine(isPrivateJwk, {
    message: 'private key required',
});
function hasKid(jwk) {
    return 'kid' in jwk && jwk.kid != null;
}
function hasSharedSecretJwk(jwk) {
    return 'k' in jwk && jwk.k != null;
}
function hasPrivateSecretJwk(jwk) {
    return 'd' in jwk && jwk.d != null;
}
function isPrivateJwk(jwk) {
    return hasPrivateSecretJwk(jwk) || hasSharedSecretJwk(jwk);
}
function isPublicJwk(jwk) {
    return !hasPrivateSecretJwk(jwk) && !hasSharedSecretJwk(jwk);
}
//# sourceMappingURL=jwk.js.map