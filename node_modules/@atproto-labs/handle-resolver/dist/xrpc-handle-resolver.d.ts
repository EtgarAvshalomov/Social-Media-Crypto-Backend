import { z } from 'zod';
import { HandleResolver, ResolveHandleOptions, ResolvedHandle } from './types.js';
export declare const xrpcErrorSchema: z.ZodObject<{
    error: z.ZodString;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    error: string;
    message?: string | undefined;
}, {
    error: string;
    message?: string | undefined;
}>;
export type XrpcHandleResolverOptions = {
    /**
     * Fetch function to use for HTTP requests. Allows customizing the request
     * behavior, e.g. adding headers, setting a timeout, mocking, etc.
     *
     * @default globalThis.fetch
     */
    fetch?: typeof globalThis.fetch;
};
export declare class XrpcHandleResolver implements HandleResolver {
    /**
     * URL of the atproto lexicon server. This is the base URL where the
     * `com.atproto.identity.resolveHandle` XRPC method is located.
     */
    protected readonly serviceUrl: URL;
    protected readonly fetch: typeof globalThis.fetch;
    constructor(service: URL | string, options?: XrpcHandleResolverOptions);
    resolve(handle: string, options?: ResolveHandleOptions): Promise<ResolvedHandle>;
}
//# sourceMappingURL=xrpc-handle-resolver.d.ts.map