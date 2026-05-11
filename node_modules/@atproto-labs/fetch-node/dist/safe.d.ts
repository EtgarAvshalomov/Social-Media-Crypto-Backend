import { UnicastFetchWrapOptions } from './unicast.js';
export type SafeFetchWrapOptions<C> = UnicastFetchWrapOptions<C> & {
    responseMaxSize?: number;
    ssrfProtection?: boolean;
    allowCustomPort?: boolean;
    allowData?: boolean;
    allowHttp?: boolean;
    allowIpHost?: boolean;
    allowPrivateIps?: boolean;
    timeout?: number;
    forbiddenDomainNames?: Iterable<string>;
    /**
     * When `false`, a {@link RequestInit['redirect']} value must be explicitly
     * provided as second argument to the returned function or requests will fail.
     *
     * @default false
     */
    allowImplicitRedirect?: boolean;
};
/**
 * Wrap a fetch function with safety checks so that it can be safely used
 * with user provided input (URL).
 *
 * @see {@link https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html}
 *
 * @note When {@link SafeFetchWrapOptions.allowImplicitRedirect} is `false`
 * (default), then the returned function **must** be called setting the second
 * argument's `redirect` property to one of the allowed values. Otherwise, if
 * the returned fetch function is called with a `Request` object (and no
 * explicit `redirect` init object), then the verification code will not be able
 * to determine if the `redirect` property was explicitly set or based on the
 * default value (`follow`), causing it to preventively block the request (throw
 * an error). For this reason, unless you set
 * {@link SafeFetchWrapOptions.allowImplicitRedirect} to `true`, you should
 * **not** wrap the returned function into another function that creates a
 * {@link Request} object before passing it to the function (as a e.g. a logging
 * function would).
 */
export declare function safeFetchWrap<C>({ fetch, dangerouslyForceKeepAliveAgent, responseMaxSize, // 512kB
ssrfProtection, allowCustomPort, allowData, allowHttp, allowIpHost, allowPrivateIps, timeout, forbiddenDomainNames, allowImplicitRedirect, }?: SafeFetchWrapOptions<C>): (input: string | URL | Request, init?: RequestInit | undefined) => Promise<Response>;
//# sourceMappingURL=safe.d.ts.map