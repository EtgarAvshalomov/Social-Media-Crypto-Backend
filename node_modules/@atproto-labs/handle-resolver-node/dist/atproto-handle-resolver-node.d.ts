import { Fetch } from '@atproto-labs/fetch-node';
import { AtprotoHandleResolver, HandleResolver } from '@atproto-labs/handle-resolver';
export type AtprotoHandleResolverNodeOptions = {
    /**
     * List of backup nameservers to use in case the primary ones fail. Will
     * default to no fallback nameservers.
     */
    fallbackNameservers?: string[];
    /**
     * Fetch function to use for HTTP requests. Allows customizing the request
     * behavior, e.g. adding headers, setting a timeout, mocking, etc. The
     * provided fetch function will be wrapped with a safeFetchWrap function that
     * adds SSRF protection.
     *
     * @default `globalThis.fetch`
     */
    fetch?: Fetch;
};
export declare class AtprotoHandleResolverNode extends AtprotoHandleResolver implements HandleResolver {
    constructor({ fetch, fallbackNameservers, }?: AtprotoHandleResolverNodeOptions);
}
//# sourceMappingURL=atproto-handle-resolver-node.d.ts.map