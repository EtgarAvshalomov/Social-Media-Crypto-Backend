import { AtprotoIdentityDidMethods } from '@atproto/did';
import { DidCache } from './did-cache.js';
import { DidResolverCommonOptions } from './did-resolver-common.js';
import { DidResolver } from './did-resolver.js';
export type { AtprotoIdentityDidMethods };
export type CreateDidResolverOptions = {
    didResolver?: DidResolver<AtprotoIdentityDidMethods>;
    didCache?: DidCache;
} & Partial<DidResolverCommonOptions>;
export declare function createDidResolver(options: CreateDidResolverOptions): DidResolver<AtprotoIdentityDidMethods>;
//# sourceMappingURL=create-did-resolver.d.ts.map