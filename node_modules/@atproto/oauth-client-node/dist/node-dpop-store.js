"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDpopKeyStore = toDpopKeyStore;
const jwk_jose_1 = require("@atproto/jwk-jose");
/**
 * Utility function that allows to simplify the store interface by exposing a
 * JWK (JSON) instead of a Key instance.
 */
function toDpopKeyStore(store) {
    return {
        async set(sub, { dpopKey, ...data }) {
            const dpopJwk = dpopKey.privateJwk;
            if (!dpopJwk)
                throw new Error('Private DPoP JWK is missing.');
            await store.set(sub, { ...data, dpopJwk });
        },
        async get(sub) {
            const result = await store.get(sub);
            if (!result)
                return undefined;
            const { dpopJwk, ...data } = result;
            const dpopKey = await jwk_jose_1.JoseKey.fromJWK(dpopJwk);
            return { ...data, dpopKey };
        },
        del: store.del.bind(store),
        clear: store.clear?.bind(store),
    };
}
//# sourceMappingURL=node-dpop-store.js.map