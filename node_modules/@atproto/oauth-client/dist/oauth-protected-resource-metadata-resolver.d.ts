import { OAuthProtectedResourceMetadata } from '@atproto/oauth-types';
import { Fetch } from '@atproto-labs/fetch';
import { CachedGetter, GetCachedOptions, SimpleStore } from '@atproto-labs/simple-store';
export type { GetCachedOptions, OAuthProtectedResourceMetadata };
export type ProtectedResourceMetadataCache = SimpleStore<string, OAuthProtectedResourceMetadata>;
export type OAuthProtectedResourceMetadataResolverConfig = {
    allowHttpResource?: boolean;
};
/**
 * @see {@link https://www.rfc-editor.org/rfc/rfc9728.html}
 */
export declare class OAuthProtectedResourceMetadataResolver extends CachedGetter<string, OAuthProtectedResourceMetadata> {
    private readonly fetch;
    private readonly allowHttpResource;
    constructor(cache: ProtectedResourceMetadataCache, fetch?: Fetch, config?: OAuthProtectedResourceMetadataResolverConfig);
    get(resource: string | URL, options?: GetCachedOptions): Promise<OAuthProtectedResourceMetadata>;
    private fetchMetadata;
}
//# sourceMappingURL=oauth-protected-resource-metadata-resolver.d.ts.map