"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createIdentityResolver = createIdentityResolver;
const did_resolver_1 = require("@atproto-labs/did-resolver");
const handle_resolver_1 = require("@atproto-labs/handle-resolver");
const atproto_identity_resolver_js_1 = require("./atproto-identity-resolver.js");
function createIdentityResolver(options) {
    if ('identityResolver' in options && options.identityResolver != null) {
        return options.identityResolver;
    }
    if ('handleResolver' in options && options.handleResolver != null) {
        const didResolver = (0, did_resolver_1.createDidResolver)(options);
        const handleResolver = (0, handle_resolver_1.createHandleResolver)(options);
        return new atproto_identity_resolver_js_1.AtprotoIdentityResolver(didResolver, handleResolver);
    }
    throw new TypeError('identityResolver or handleResolver option is required');
}
//# sourceMappingURL=create-identity-resolver.js.map