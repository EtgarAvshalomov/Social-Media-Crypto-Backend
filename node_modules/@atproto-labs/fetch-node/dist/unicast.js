"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unicastFetchWrap = unicastFetchWrap;
exports.unicastLookup = unicastLookup;
const node_dns_1 = __importDefault(require("node:dns"));
const ipaddr_js_1 = __importDefault(require("ipaddr.js"));
const undici_1 = require("undici");
const fetch_1 = require("@atproto-labs/fetch");
const util_js_1 = require("./util.js");
const { IPv4, IPv6 } = ipaddr_js_1.default;
// @TODO support other runtimes ?
const SUPPORTS_REQUEST_INIT_DISPATCHER = Number(process.versions.node.split('.')[0]) >= 20;
/**
 * @see {@link https://owasp.org/Top10/A10_2021-Server-Side_Request_Forgery_%28SSRF%29/}
 */
function unicastFetchWrap({ fetch = globalThis.fetch, dangerouslyForceKeepAliveAgent = false, }) {
    if (SUPPORTS_REQUEST_INIT_DISPATCHER ||
        dangerouslyForceKeepAliveAgent ||
        fetch === globalThis.fetch) {
        const dispatcher = new undici_1.Agent({
            connect: { lookup: unicastLookup },
        });
        return async function (input, init) {
            if (init?.dispatcher) {
                throw new fetch_1.FetchRequestError((0, fetch_1.asRequest)(input, init), 500, 'SSRF protection cannot be used with a custom request dispatcher');
            }
            const url = (0, fetch_1.extractUrl)(input);
            if (url.hostname && (0, util_js_1.isUnicastIp)(url.hostname) === false) {
                throw new fetch_1.FetchRequestError((0, fetch_1.asRequest)(input, init), 400, 'Hostname is a non-unicast address');
            }
            if (SUPPORTS_REQUEST_INIT_DISPATCHER) {
                // @ts-expect-error non-standard option
                const request = new Request(input, { ...init, dispatcher });
                return fetch.call(this, request);
            }
            else {
                // @ts-expect-error non-standard option
                return fetch.call(this, input, { ...init, dispatcher });
            }
        };
    }
    else {
        return async function (input, init) {
            if (init?.dispatcher) {
                throw new fetch_1.FetchRequestError((0, fetch_1.asRequest)(input, init), 500, 'SSRF protection cannot be used with a custom request dispatcher');
            }
            const url = (0, fetch_1.extractUrl)(input);
            if (!url.hostname) {
                return fetch.call(this, input, init);
            }
            switch ((0, util_js_1.isUnicastIp)(url.hostname)) {
                case true: {
                    // hostname is a unicast address, safe to proceed.
                    return fetch.call(this, input, init);
                }
                case false: {
                    throw new fetch_1.FetchRequestError((0, fetch_1.asRequest)(input, init), 400, 'Hostname is a non-unicast address');
                }
                case undefined: {
                    // hostname is a domain name, let's create a new dispatcher that
                    // will 1) use the unicastLookup function to resolve the hostname
                    // and 2) allow us to check that the lookup function was indeed
                    // called.
                    let didLookup = false;
                    const dispatcher = new undici_1.Client(url.origin, {
                        // Do *not* enable H2 here, as it will cause an error (the
                        // client will terminate the connection before the response is
                        // consumed).
                        // https://github.com/nodejs/undici/issues/3671
                        connect: {
                            keepAlive: false, // Client will be used once
                            lookup(...args) {
                                didLookup = true;
                                unicastLookup(...args);
                            },
                        },
                    });
                    try {
                        const headers = new Headers(init?.headers);
                        headers.set('connection', 'close'); // Proactively close the connection
                        const response = await fetch.call(this, input, {
                            ...init,
                            headers,
                            // @ts-expect-error non-standard option
                            dispatcher,
                        });
                        if (!didLookup) {
                            // We need to ensure that the body is discarded. We can either
                            // consume the whole body (for await loop) in order to keep the
                            // socket alive, or cancel the request. Since we sent "connection:
                            // close", there is no point in consuming the whole response
                            // (which would cause un-necessary bandwidth).
                            //
                            // https://undici.nodejs.org/#/?id=garbage-collection
                            await response.body?.cancel();
                            // If you encounter this error, either upgrade to Node.js >=21 or
                            // make sure that the dispatcher passed through the requestInit
                            // object ends up being used to make the request.
                            // eslint-disable-next-line no-unsafe-finally
                            throw new fetch_1.FetchRequestError((0, fetch_1.asRequest)(input, init), 500, 'Unable to enforce SSRF protection');
                        }
                        return response;
                    }
                    finally {
                        // Free resources (we cannot await here since the response was not
                        // consumed yet).
                        void dispatcher.close().catch((err) => {
                            // No biggie, but let's still log it
                            console.warn('Failed to close dispatcher', err);
                        });
                    }
                }
            }
        };
    }
}
function unicastLookup(hostname, options, callback) {
    if (isLocalHostname(hostname)) {
        callback(new Error('Hostname is not a public domain'), []);
        return;
    }
    node_dns_1.default.lookup(hostname, options, (err, address, family) => {
        if (err) {
            callback(err, address, family);
        }
        else {
            const ips = Array.isArray(address)
                ? address.map(parseLookupAddress)
                : [parseLookupAddress({ address, family })];
            if (ips.some(isNotUnicast)) {
                callback(new Error('Hostname resolved to non-unicast address'), address, family);
            }
            else {
                callback(null, address, family);
            }
        }
    });
}
/**
 * @param hostname - a syntactically valid hostname
 * @returns whether the hostname is a name typically used for on locale area networks.
 * @note **DO NOT** use for security reasons. Only as heuristic.
 */
function isLocalHostname(hostname) {
    const parts = hostname.split('.');
    if (parts.length < 2)
        return true;
    const tld = parts.at(-1).toLowerCase();
    return (tld === 'test' ||
        tld === 'local' ||
        tld === 'localhost' ||
        tld === 'invalid' ||
        tld === 'example');
}
function isNotUnicast(ip) {
    return ip.range() !== 'unicast';
}
function parseLookupAddress({ address, family, }) {
    const ip = family === 4 ? IPv4.parse(address) : IPv6.parse(address);
    if (ip instanceof IPv6 && ip.isIPv4MappedAddress()) {
        return ip.toIPv4Address();
    }
    else {
        return ip;
    }
}
//# sourceMappingURL=unicast.js.map