import { AtprotoDid, AtprotoIdentityDidMethods, DidDocument, DidResolver, ResolveDidOptions } from '@atproto-labs/did-resolver';
import { HandleResolver, ResolveHandleOptions } from '@atproto-labs/handle-resolver';
import { IdentityInfo, IdentityResolver, ResolveIdentityOptions } from './identity-resolver.js';
/**
 * Implementation of the official ATPROTO identity resolution strategy.
 * This implementation relies on two primitives:
 * - DID resolution (using the `DidResolver` interface)
 * - Handle resolution (using the `HandleResolver` interface)
 */
export declare class AtprotoIdentityResolver implements IdentityResolver {
    protected readonly didResolver: DidResolver<AtprotoIdentityDidMethods>;
    protected readonly handleResolver: HandleResolver;
    constructor(didResolver: DidResolver<AtprotoIdentityDidMethods>, handleResolver: HandleResolver);
    resolve(input: string, options?: ResolveIdentityOptions): Promise<IdentityInfo>;
    resolveFromDid(did: AtprotoDid, options?: ResolveDidOptions): Promise<IdentityInfo>;
    resolveFromHandle(handle: string, options?: ResolveHandleOptions): Promise<IdentityInfo>;
    getDocumentFromDid(did: AtprotoDid, options?: ResolveDidOptions): Promise<DidDocument<AtprotoIdentityDidMethods>>;
    getDocumentFromHandle(input: string, options?: ResolveHandleOptions): Promise<DidDocument<AtprotoIdentityDidMethods>>;
}
//# sourceMappingURL=atproto-identity-resolver.d.ts.map