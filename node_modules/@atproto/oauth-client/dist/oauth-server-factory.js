"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuthServerFactory = void 0;
const oauth_server_agent_js_1 = require("./oauth-server-agent.js");
class OAuthServerFactory {
    constructor(clientMetadata, runtime, resolver, fetch, keyset, dpopNonceCache) {
        Object.defineProperty(this, "clientMetadata", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: clientMetadata
        });
        Object.defineProperty(this, "runtime", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: runtime
        });
        Object.defineProperty(this, "resolver", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: resolver
        });
        Object.defineProperty(this, "fetch", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: fetch
        });
        Object.defineProperty(this, "keyset", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: keyset
        });
        Object.defineProperty(this, "dpopNonceCache", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: dpopNonceCache
        });
    }
    /**
     * @param authMethod `undefined` means that we are restoring a session that
     * was created before we started storing the `authMethod` in the session. In
     * that case, we will use the first key from the keyset.
     *
     * Support for this might be removed in the future.
     *
     * @throws see {@link OAuthServerFactory.fromMetadata}
     */
    async fromIssuer(issuer, authMethod, dpopKey, options) {
        const serverMetadata = await this.resolver.getAuthorizationServerMetadata(issuer, options);
        return this.fromMetadata(serverMetadata, authMethod, dpopKey);
    }
    /**
     * @throws see {@link OAuthServerAgent}
     */
    async fromMetadata(serverMetadata, authMethod, dpopKey) {
        return new oauth_server_agent_js_1.OAuthServerAgent(authMethod, dpopKey, serverMetadata, this.clientMetadata, this.dpopNonceCache, this.resolver, this.runtime, this.keyset, this.fetch);
    }
}
exports.OAuthServerFactory = OAuthServerFactory;
//# sourceMappingURL=oauth-server-factory.js.map