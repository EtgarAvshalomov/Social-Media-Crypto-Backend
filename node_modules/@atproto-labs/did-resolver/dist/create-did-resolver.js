"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDidResolver = createDidResolver;
const did_cache_js_1 = require("./did-cache.js");
const did_resolver_common_js_1 = require("./did-resolver-common.js");
function createDidResolver(options) {
    const { didResolver, didCache } = options;
    if (didResolver instanceof did_cache_js_1.DidResolverCached && !didCache) {
        return didResolver;
    }
    return new did_cache_js_1.DidResolverCached(didResolver ?? new did_resolver_common_js_1.DidResolverCommon(options), didCache);
}
//# sourceMappingURL=create-did-resolver.js.map