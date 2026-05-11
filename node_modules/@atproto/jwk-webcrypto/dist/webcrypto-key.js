"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebcryptoKey = void 0;
const jwk_1 = require("@atproto/jwk");
const jwk_jose_1 = require("@atproto/jwk-jose");
const util_js_1 = require("./util.js");
class WebcryptoKey extends jwk_jose_1.JoseKey {
    // We need to override the static method generate from JoseKey because
    // the browser needs both the private and public keys
    static async generate(allowedAlgos = ['ES256'], kid = crypto.randomUUID(), options) {
        const keyPair = await this.generateKeyPair(allowedAlgos, options);
        // Type safety only: in the browser, 'jose' always generates a CryptoKeyPair
        if (!(0, util_js_1.isCryptoKeyPair)(keyPair)) {
            throw new TypeError('Invalid CryptoKeyPair');
        }
        return this.fromKeypair(keyPair, kid);
    }
    static async fromKeypair(cryptoKeyPair, kid) {
        const { alg = (0, util_js_1.fromSubtleAlgorithm)(cryptoKeyPair.privateKey.algorithm), ...jwk } = await crypto.subtle.exportKey('jwk', cryptoKeyPair.privateKey.extractable
            ? cryptoKeyPair.privateKey
            : cryptoKeyPair.publicKey);
        return new WebcryptoKey(jwk_1.jwkSchema.parse({ ...jwk, kid, alg }), cryptoKeyPair);
    }
    constructor(jwk, cryptoKeyPair) {
        // Webcrypto keys are bound to a single algorithm
        if (!jwk.alg)
            throw new jwk_1.JwkError('JWK "alg" is required for Webcrypto keys');
        super(jwk);
        Object.defineProperty(this, "cryptoKeyPair", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: cryptoKeyPair
        });
    }
    get isPrivate() {
        return true;
    }
    async getKeyObj(alg) {
        if (this.jwk.alg !== alg) {
            throw new jwk_1.JwkError(`Key cannot be used with algorithm "${alg}"`);
        }
        return this.cryptoKeyPair.privateKey;
    }
}
exports.WebcryptoKey = WebcryptoKey;
//# sourceMappingURL=webcrypto-key.js.map