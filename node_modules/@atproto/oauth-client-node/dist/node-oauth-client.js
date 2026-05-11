"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeOAuthClient = void 0;
const node_crypto_1 = require("node:crypto");
const jwk_jose_1 = require("@atproto/jwk-jose");
const oauth_client_1 = require("@atproto/oauth-client");
const handle_resolver_node_1 = require("@atproto-labs/handle-resolver-node");
const node_dpop_store_js_1 = require("./node-dpop-store.js");
class NodeOAuthClient extends oauth_client_1.OAuthClient {
    constructor({ requestLock = undefined, fallbackNameservers = undefined, fetch, responseMode = 'query', stateStore, sessionStore, handleResolver = new handle_resolver_node_1.AtprotoHandleResolverNode({
        fetch,
        fallbackNameservers,
    }), runtimeImplementation = {
        requestLock,
        createKey: (algs) => jwk_jose_1.JoseKey.generate(algs),
        getRandomValues: node_crypto_1.randomBytes,
        digest: (bytes, algorithm) => (0, node_crypto_1.createHash)(algorithm.name).update(bytes).digest(),
    }, ...options }) {
        if (!runtimeImplementation.requestLock) {
            // Ok if only one instance of the client is running at a time.
            console.warn('No lock mechanism provided. Credentials might get revoked.');
        }
        super({
            ...options,
            fetch,
            responseMode,
            handleResolver,
            runtimeImplementation,
            stateStore: (0, node_dpop_store_js_1.toDpopKeyStore)(stateStore),
            sessionStore: (0, node_dpop_store_js_1.toDpopKeyStore)(sessionStore),
        });
    }
}
exports.NodeOAuthClient = NodeOAuthClient;
//# sourceMappingURL=node-oauth-client.js.map