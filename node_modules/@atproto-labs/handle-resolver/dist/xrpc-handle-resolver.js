"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XrpcHandleResolver = exports.xrpcErrorSchema = void 0;
const zod_1 = require("zod");
const handle_resolver_error_js_1 = require("./handle-resolver-error.js");
const types_js_1 = require("./types.js");
exports.xrpcErrorSchema = zod_1.z.object({
    error: zod_1.z.string(),
    message: zod_1.z.string().optional(),
});
class XrpcHandleResolver {
    constructor(service, options) {
        /**
         * URL of the atproto lexicon server. This is the base URL where the
         * `com.atproto.identity.resolveHandle` XRPC method is located.
         */
        Object.defineProperty(this, "serviceUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "fetch", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.serviceUrl = new URL(service);
        this.fetch = options?.fetch ?? globalThis.fetch;
    }
    async resolve(handle, options) {
        const url = new URL('/xrpc/com.atproto.identity.resolveHandle', this.serviceUrl);
        url.searchParams.set('handle', handle);
        const response = await this.fetch.call(null, url, {
            cache: options?.noCache ? 'no-cache' : undefined,
            signal: options?.signal,
            redirect: 'error',
        });
        const payload = await response.json();
        // The response should either be
        // - 400 Bad Request with { error: 'InvalidRequest', message: 'Unable to resolve handle' }
        // - 200 OK with { did: NonNullable<ResolvedHandle> }
        // Any other response is considered unexpected behavior an should throw an error.
        if (response.status === 400) {
            const { error, data } = exports.xrpcErrorSchema.safeParse(payload);
            if (error) {
                throw new handle_resolver_error_js_1.HandleResolverError(`Invalid response from resolveHandle method: ${error.message}`, { cause: error });
            }
            if (data.error === 'InvalidRequest' &&
                data.message === 'Unable to resolve handle') {
                return null;
            }
        }
        if (!response.ok) {
            throw new handle_resolver_error_js_1.HandleResolverError('Invalid status code from resolveHandle method');
        }
        const value = payload?.did;
        if (!(0, types_js_1.isResolvedHandle)(value)) {
            throw new handle_resolver_error_js_1.HandleResolverError('Invalid DID returned from resolveHandle method');
        }
        return value;
    }
}
exports.XrpcHandleResolver = XrpcHandleResolver;
//# sourceMappingURL=xrpc-handle-resolver.js.map