"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateClientMetadata = validateClientMetadata;
const oauth_types_1 = require("@atproto/oauth-types");
const constants_js_1 = require("./constants.js");
const types_js_1 = require("./types.js");
function validateClientMetadata(input, keyset) {
    // Allow to pass a keyset and omit the jwks/jwks_uri properties
    if (!input.jwks && !input.jwks_uri && keyset?.size) {
        input = { ...input, jwks: keyset.toJSON() };
    }
    const metadata = types_js_1.clientMetadataSchema.parse(input);
    // Validate client ID
    if (metadata.client_id.startsWith('http:')) {
        (0, oauth_types_1.assertOAuthLoopbackClientId)(metadata.client_id);
    }
    else {
        (0, oauth_types_1.assertOAuthDiscoverableClientId)(metadata.client_id);
    }
    const scopes = metadata.scope?.split(' ');
    if (!scopes?.includes('atproto')) {
        throw new TypeError(`Client metadata must include the "atproto" scope`);
    }
    if (!metadata.response_types.includes('code')) {
        throw new TypeError(`"response_types" must include "code"`);
    }
    if (!metadata.grant_types.includes('authorization_code')) {
        throw new TypeError(`"grant_types" must include "authorization_code"`);
    }
    const method = metadata.token_endpoint_auth_method;
    const methodAlg = metadata.token_endpoint_auth_signing_alg;
    switch (method) {
        case 'none':
            if (methodAlg) {
                throw new TypeError(`"token_endpoint_auth_signing_alg" must not be provided when "token_endpoint_auth_method" is "${method}"`);
            }
            break;
        case 'private_key_jwt': {
            if (!methodAlg) {
                throw new TypeError(`"token_endpoint_auth_signing_alg" must be provided when "token_endpoint_auth_method" is "${method}"`);
            }
            if (!keyset) {
                throw new TypeError(`Client authentication method "${method}" requires a keyset`);
            }
            // @NOTE This reproduces the logic from `negotiateClientAuthMethod` at
            // initialization time to ensure that every key that might end-up being
            // used is indeed valid & advertised in the metadata.
            const signingKeys = Array.from(keyset.list({ usage: 'sign' })).filter((key) => key.kid);
            if (!signingKeys.length) {
                throw new TypeError(`Client authentication method "${method}" requires at least one active signing key with a "kid" property`);
            }
            if (!signingKeys.some((key) => key.algorithms.includes(constants_js_1.FALLBACK_ALG))) {
                throw new TypeError(`Client authentication method "${method}" requires at least one active "${constants_js_1.FALLBACK_ALG}" signing key`);
            }
            if (metadata.jwks) {
                // Ensure that all the signing keys that could end-up being used are
                // advertised in the JWKS.
                for (const key of signingKeys) {
                    if (!metadata.jwks.keys.some((k) => k.kid === key.kid && !k.revoked)) {
                        throw new TypeError(`Missing or inactive key "${key.kid}" in jwks. Make sure that every signing key of the Keyset is declared as an active key in the Metadata's JWKS.`);
                    }
                }
            }
            else if (metadata.jwks_uri) {
                // @NOTE we only ensure that all the signing keys are referenced in JWKS
                // when it is available (see previous "if") as we don't want to download
                // that file here (for efficiency reasons).
            }
            else {
                throw new TypeError(`Client authentication method "${method}" requires a JWKS`);
            }
            break;
        }
        default:
            throw new TypeError(`Unsupported "token_endpoint_auth_method" value: ${method}`);
    }
    return metadata;
}
//# sourceMappingURL=validate-client-metadata.js.map