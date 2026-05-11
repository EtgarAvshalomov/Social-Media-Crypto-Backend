import { CreateDidResolverOptions } from '@atproto-labs/did-resolver';
import { CreateHandleResolverOptions } from '@atproto-labs/handle-resolver';
import { IdentityResolver } from './identity-resolver.js';
export type CreateIdentityResolverOptions = {
    identityResolver?: IdentityResolver;
} & Partial<CreateDidResolverOptions & CreateHandleResolverOptions>;
export declare function createIdentityResolver(options: CreateIdentityResolverOptions): IdentityResolver;
//# sourceMappingURL=create-identity-resolver.d.ts.map