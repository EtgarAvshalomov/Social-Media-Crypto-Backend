"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHandleResolver = createHandleResolver;
const cached_handle_resolver_js_1 = require("./cached-handle-resolver.js");
const xrpc_handle_resolver_js_1 = require("./xrpc-handle-resolver.js");
function createHandleResolver(options) {
    const { handleResolver, handleCache } = options;
    if (handleResolver instanceof cached_handle_resolver_js_1.CachedHandleResolver && !handleCache) {
        return handleResolver;
    }
    return new cached_handle_resolver_js_1.CachedHandleResolver(typeof handleResolver === 'string' || handleResolver instanceof URL
        ? new xrpc_handle_resolver_js_1.XrpcHandleResolver(handleResolver, options)
        : handleResolver, handleCache);
}
//# sourceMappingURL=create-handle-resolver.js.map