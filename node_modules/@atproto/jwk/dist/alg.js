"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwkAlgorithms = jwkAlgorithms;
const errors_js_1 = require("./errors.js");
const jwk_js_1 = require("./jwk.js");
// Copy variable to prevent bundlers from automatically polyfilling "process" (e.g. parcel)
const { process } = globalThis;
const IS_NODE_RUNTIME = typeof process !== 'undefined' && typeof process?.versions?.node === 'string';
function* jwkAlgorithms(jwk) {
    // Ed25519, Ed448, and secp256k1 always have "alg"
    if (typeof jwk.alg === 'string') {
        yield jwk.alg;
        return;
    }
    switch (jwk.kty) {
        case 'EC': {
            if (jwkSupportsEnc(jwk)) {
                yield 'ECDH-ES';
                yield 'ECDH-ES+A128KW';
                yield 'ECDH-ES+A192KW';
                yield 'ECDH-ES+A256KW';
            }
            if (jwkSupportsSig(jwk)) {
                const crv = 'crv' in jwk ? jwk.crv : undefined;
                switch (crv) {
                    case 'P-256':
                    case 'P-384':
                        yield `ES${crv.slice(-3)}`;
                        break;
                    case 'P-521':
                        yield 'ES512';
                        break;
                    case 'secp256k1':
                        if (IS_NODE_RUNTIME)
                            yield 'ES256K';
                        break;
                    default:
                        throw new errors_js_1.JwkError(`Unsupported crv "${crv}"`);
                }
            }
            return;
        }
        case 'OKP': {
            if (!jwk.use)
                throw new errors_js_1.JwkError('Missing "use" Parameter value');
            yield 'ECDH-ES';
            yield 'ECDH-ES+A128KW';
            yield 'ECDH-ES+A192KW';
            yield 'ECDH-ES+A256KW';
            return;
        }
        case 'RSA': {
            if (jwkSupportsEnc(jwk)) {
                yield 'RSA-OAEP';
                yield 'RSA-OAEP-256';
                yield 'RSA-OAEP-384';
                yield 'RSA-OAEP-512';
                if (IS_NODE_RUNTIME)
                    yield 'RSA1_5';
            }
            if (jwkSupportsSig(jwk)) {
                yield 'PS256';
                yield 'PS384';
                yield 'PS512';
                yield 'RS256';
                yield 'RS384';
                yield 'RS512';
            }
            return;
        }
        case 'oct': {
            if (jwkSupportsEnc(jwk)) {
                yield 'A128GCMKW';
                yield 'A192GCMKW';
                yield 'A256GCMKW';
                yield 'A128KW';
                yield 'A192KW';
                yield 'A256KW';
            }
            if (jwkSupportsSig(jwk)) {
                yield 'HS256';
                yield 'HS384';
                yield 'HS512';
            }
            return;
        }
        default:
            throw new errors_js_1.JwkError(`Unsupported kty "${jwk.kty}"`);
    }
}
function jwkSupportsEnc(jwk) {
    return (jwk.key_ops?.some(jwk_js_1.isEncKeyUsage) ?? (jwk.use == null || jwk.use === 'enc'));
}
function jwkSupportsSig(jwk) {
    return (jwk.key_ops?.some(jwk_js_1.isSigKeyUsage) ?? (jwk.use == null || jwk.use === 'sig'));
}
//# sourceMappingURL=alg.js.map