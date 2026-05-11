import { HandleCache } from './cached-handle-resolver.js';
import { HandleResolver } from './types.js';
import { XrpcHandleResolverOptions } from './xrpc-handle-resolver.js';
export type CreateHandleResolverOptions = {
    handleResolver: URL | string | HandleResolver;
    handleCache?: HandleCache;
} & Partial<XrpcHandleResolverOptions>;
export declare function createHandleResolver(options: CreateHandleResolverOptions): HandleResolver;
//# sourceMappingURL=create-handle-resolver.d.ts.map