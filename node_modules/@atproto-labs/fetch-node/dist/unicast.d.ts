import dns from 'node:dns';
import { LookupFunction } from 'node:net';
import { Fetch, FetchContext } from '@atproto-labs/fetch';
export type UnicastFetchWrapOptions<C = FetchContext> = {
    fetch?: Fetch<C>;
    /**
     * ## ‼️ important security feature use with care
     *
     * On older NodeJS version, the `dispatcher` init option is ignored when
     * creating a new Request instance. It can only be passed through the fetch
     * function directly.
     *
     * Since this is a security feature, we need to ensure that the unicastLookup
     * function is called to resolve the hostname to a unicast IP address.
     *
     * However, in the case a custom "fetch" function is passed here (fetch !==
     * globalThis.fetch), we have no guarantee that the dispatcher will be used to
     * make the request. Because of this, in such a case, we will use a one-time
     * use dispatcher that checks that the provided fetch function indeed made use
     * of the "unicastLookup" when a custom dispatch init function is used.
     *
     * Sadly, this means that we cannot use "keepAlive" connections, as the method
     * used to ensure that "unicastLookup" gets called requires to create a new
     * dispatcher for each request.
     *
     * If you can guarantee that the provided fetch function will make use of the
     * "dispatcher" init option, you can set this flag to true, which will enable
     * the use of a single agent (with keep-alive) for all requests.
     *
     * @default false
     * @note This option has no effect on Node.js versions >= 20
     */
    dangerouslyForceKeepAliveAgent?: boolean;
};
/**
 * @see {@link https://owasp.org/Top10/A10_2021-Server-Side_Request_Forgery_%28SSRF%29/}
 */
export declare function unicastFetchWrap<C = FetchContext>({ fetch, dangerouslyForceKeepAliveAgent, }: UnicastFetchWrapOptions<C>): Fetch<C>;
export declare function unicastLookup(hostname: string, options: dns.LookupOptions, callback: Parameters<LookupFunction>[2]): void;
//# sourceMappingURL=unicast.d.ts.map