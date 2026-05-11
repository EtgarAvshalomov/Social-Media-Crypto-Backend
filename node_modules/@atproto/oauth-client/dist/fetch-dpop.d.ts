import { Key } from '@atproto/jwk';
import { Fetch, FetchContext } from '@atproto-labs/fetch';
import { SimpleStore } from '@atproto-labs/simple-store';
export type DpopFetchWrapperOptions<C = FetchContext> = {
    key: Key;
    nonces: SimpleStore<string, string>;
    supportedAlgs?: string[];
    sha256?: (input: string) => Promise<string>;
    /**
     * Is the intended server an authorization server (true) or a resource server
     * (false)? Setting this may allow to avoid parsing the response body to
     * determine the dpop-nonce.
     *
     * @default undefined
     */
    isAuthServer?: boolean;
    fetch?: Fetch<C>;
};
export declare function dpopFetchWrapper<C = FetchContext>({ key, supportedAlgs, nonces, sha256, isAuthServer, fetch, }: DpopFetchWrapperOptions<C>): Fetch<C>;
//# sourceMappingURL=fetch-dpop.d.ts.map