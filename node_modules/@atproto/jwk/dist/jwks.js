"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwksPubSchema = exports.jwksSchema = void 0;
const zod_1 = require("zod");
const jwk_js_1 = require("./jwk.js");
/**
 * JSON Web Key Set schema. The keys set, in this context, represents a
 * collection of JSON Web Keys (JWKs), that can be both public and private.
 */
exports.jwksSchema = zod_1.z.object({
    keys: zod_1.z.array(zod_1.z.unknown()).transform((input) => {
        // > Implementations SHOULD ignore JWKs within a JWK Set that use "kty"
        // > (key type) values that are not understood by them, that are missing
        // > required members, or for which values are out of the supported
        // > ranges.
        return input
            .map((item) => jwk_js_1.jwkSchema.safeParse(item))
            .filter((res) => res.success)
            .map((res) => res.data);
    }),
});
/**
 * Public JSON Web Key Set schema.
 */
exports.jwksPubSchema = zod_1.z.object({
    keys: zod_1.z.array(zod_1.z.unknown()).transform((input) => {
        // > Implementations SHOULD ignore JWKs within a JWK Set that use "kty"
        // > (key type) values that are not understood by them, that are missing
        // > required members, or for which values are out of the supported
        // > ranges.
        return input
            .map((item) => jwk_js_1.jwkPubSchema.safeParse(item))
            .filter((res) => res.success)
            .map((res) => res.data);
    }),
});
//# sourceMappingURL=jwks.js.map