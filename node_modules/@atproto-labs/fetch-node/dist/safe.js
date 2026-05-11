"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeFetchWrap = safeFetchWrap;
const fetch_1 = require("@atproto-labs/fetch");
const pipe_1 = require("@atproto-labs/pipe");
const unicast_js_1 = require("./unicast.js");
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
function safeFetchWrap({ fetch = globalThis.fetch, dangerouslyForceKeepAliveAgent = false, responseMaxSize = 512 * 1024, // 512kB
ssrfProtection = true, allowCustomPort = !ssrfProtection, allowData = false, allowHttp = !ssrfProtection, allowIpHost = true, allowPrivateIps = !ssrfProtection, timeout = 10e3, forbiddenDomainNames = fetch_1.DEFAULT_FORBIDDEN_DOMAIN_NAMES, allowImplicitRedirect = false, } = {}) {
    return (0, pipe_1.pipe)(
    /**
     * Require explicit {@link RequestInit['redirect']} mode
     */
    allowImplicitRedirect ? fetch_1.asRequest : (0, fetch_1.explicitRedirectCheckRequestTransform)(), 
    /**
     * Only requests that will be issued with a "Host" header are allowed.
     */
    allowIpHost ? fetch_1.asRequest : (0, fetch_1.requireHostHeaderTransform)(), 
    /**
     * Prevent using http:, file: or data: protocols.
     */
    (0, fetch_1.protocolCheckRequestTransform)({
        'about:': false,
        'data:': allowData,
        'file:': false,
        'http:': allowHttp && { allowCustomPort },
        'https:': { allowCustomPort },
    }), 
    /**
     * Disallow fetching from domains we know are not atproto/OIDC client
     * implementation. Note that other domains can be blocked by providing a
     * custom fetch function combined with another
     * forbiddenDomainNameRequestTransform.
     */
    (0, fetch_1.forbiddenDomainNameRequestTransform)(forbiddenDomainNames), 
    /**
     * Since we will be fetching from the network based on user provided
     * input, let's mitigate resource exhaustion attacks by setting a timeout.
     */
    (0, fetch_1.timedFetch)(timeout, 
    /**
     * Since we will be fetching from the network based on user provided
     * input, we need to make sure that the request is not vulnerable to SSRF
     * attacks.
     */
    allowPrivateIps
        ? fetch
        : (0, unicast_js_1.unicastFetchWrap)({ fetch, dangerouslyForceKeepAliveAgent })), 
    /**
     * Since we will be fetching user owned data, we need to make sure that an
     * attacker cannot force us to download a large amounts of data.
     */
    (0, fetch_1.fetchMaxSizeProcessor)(responseMaxSize));
}
//# sourceMappingURL=safe.js.map