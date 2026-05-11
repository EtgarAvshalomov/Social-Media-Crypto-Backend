"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtprotoHandleResolverNode = void 0;
const fetch_node_1 = require("@atproto-labs/fetch-node");
const handle_resolver_1 = require("@atproto-labs/handle-resolver");
const node_resolve_txt_factory_js_1 = require("./node-resolve-txt-factory.js");
class AtprotoHandleResolverNode extends handle_resolver_1.AtprotoHandleResolver {
    constructor({ fetch = globalThis.fetch, fallbackNameservers, } = {}) {
        super({
            fetch: (0, fetch_node_1.safeFetchWrap)({
                fetch,
                timeout: 3000, // 3 seconds
                ssrfProtection: true,
                responseMaxSize: 10 * 1048, // DID are max 2048 characters, 10kb for safety
            }),
            resolveTxt: node_resolve_txt_factory_js_1.nodeResolveTxtDefault,
            resolveTxtFallback: fallbackNameservers?.length
                ? (0, node_resolve_txt_factory_js_1.nodeResolveTxtFactory)(fallbackNameservers)
                : undefined,
        });
    }
}
exports.AtprotoHandleResolverNode = AtprotoHandleResolverNode;
//# sourceMappingURL=atproto-handle-resolver-node.js.map