"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtprotoIdentityResolver = void 0;
const did_resolver_1 = require("@atproto-labs/did-resolver");
const constants_js_1 = require("./constants.js");
const identity_resolver_error_js_1 = require("./identity-resolver-error.js");
const util_js_1 = require("./util.js");
// @TODO Move this to its own package as soon as we have a distinct
// implementation based on XRPC calls to the
// "com.atproto.identity.resolveIdentity" method.
/**
 * Implementation of the official ATPROTO identity resolution strategy.
 * This implementation relies on two primitives:
 * - DID resolution (using the `DidResolver` interface)
 * - Handle resolution (using the `HandleResolver` interface)
 */
class AtprotoIdentityResolver {
    constructor(didResolver, handleResolver) {
        Object.defineProperty(this, "didResolver", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: didResolver
        });
        Object.defineProperty(this, "handleResolver", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: handleResolver
        });
    }
    async resolve(input, options) {
        return (0, did_resolver_1.isAtprotoDid)(input)
            ? this.resolveFromDid(input, options)
            : this.resolveFromHandle(input, options);
    }
    async resolveFromDid(did, options) {
        const document = await this.getDocumentFromDid(did, options);
        options?.signal?.throwIfAborted();
        // We will only return the document's handle alias if it resolves to the
        // same DID as the input.
        const handle = (0, util_js_1.extractNormalizedHandle)(document);
        const resolvedDid = handle
            ? await this.handleResolver
                .resolve(handle, options)
                .catch(() => undefined) // Ignore errors (temporarily unavailable)
            : undefined;
        return {
            did: document.id,
            didDoc: document,
            handle: handle && resolvedDid === did ? handle : constants_js_1.HANDLE_INVALID,
        };
    }
    async resolveFromHandle(handle, options) {
        const document = await this.getDocumentFromHandle(handle, options);
        // @NOTE bi-directional resolution enforced in getDocumentFromHandle()
        return {
            did: document.id,
            didDoc: document,
            handle: (0, util_js_1.extractNormalizedHandle)(document) || constants_js_1.HANDLE_INVALID,
        };
    }
    async getDocumentFromDid(did, options) {
        return this.didResolver.resolve(did, options);
    }
    async getDocumentFromHandle(input, options) {
        const handle = (0, util_js_1.asNormalizedHandle)(input);
        if (!handle) {
            throw new identity_resolver_error_js_1.IdentityResolverError(`Invalid handle "${input}" provided.`);
        }
        const did = await this.handleResolver.resolve(handle, options);
        if (!did) {
            throw new identity_resolver_error_js_1.IdentityResolverError(`Handle "${handle}" does not resolve to a DID`);
        }
        options?.signal?.throwIfAborted();
        // Note: Not using "return this.resolveDid(did, options)" to make the extra
        // check for the handle in the DID document:
        const document = await this.didResolver.resolve(did, options);
        // Enforce bi-directional resolution
        if (handle !== (0, util_js_1.extractNormalizedHandle)(document)) {
            throw new identity_resolver_error_js_1.IdentityResolverError(`Did document for "${did}" does not include the handle "${handle}"`);
        }
        return document;
    }
}
exports.AtprotoIdentityResolver = AtprotoIdentityResolver;
//# sourceMappingURL=atproto-identity-resolver.js.map