"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSpaceSeparatedValue = exports.numberPreprocess = exports.jsonObjectPreprocess = exports.canParseUrl = void 0;
exports.isHostnameIP = isHostnameIP;
exports.isLoopbackHost = isLoopbackHost;
exports.isLocalHostname = isLocalHostname;
exports.safeUrl = safeUrl;
exports.extractUrlPath = extractUrlPath;
exports.arrayEquivalent = arrayEquivalent;
exports.includedIn = includedIn;
exports.asArray = asArray;
exports.canParseUrl = 
// eslint-disable-next-line n/no-unsupported-features/node-builtins
URL.canParse?.bind(URL) ??
    // URL.canParse is not available in Node.js < 18.7.0
    ((urlStr) => {
        try {
            new URL(urlStr);
            return true;
        }
        catch {
            return false;
        }
    });
function isHostnameIP(hostname) {
    // IPv4
    if (hostname.match(/^\d+\.\d+\.\d+\.\d+$/))
        return true;
    // IPv6
    if (hostname.startsWith('[') && hostname.endsWith(']'))
        return true;
    return false;
}
function isLoopbackHost(host) {
    return host === 'localhost' || host === '127.0.0.1' || host === '[::1]';
}
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
function safeUrl(input) {
    try {
        return new URL(input);
    }
    catch {
        return null;
    }
}
function extractUrlPath(url) {
    // Extracts the path from a URL, without relying on the URL constructor
    // (because it normalizes the URL)
    const endOfProtocol = url.startsWith('https://')
        ? 8
        : url.startsWith('http://')
            ? 7
            : -1;
    if (endOfProtocol === -1) {
        throw new TypeError('URL must use the "https:" or "http:" protocol');
    }
    const hashIdx = url.indexOf('#', endOfProtocol);
    const questionIdx = url.indexOf('?', endOfProtocol);
    const queryStrIdx = questionIdx !== -1 && (hashIdx === -1 || questionIdx < hashIdx)
        ? questionIdx
        : -1;
    const pathEnd = hashIdx === -1
        ? queryStrIdx === -1
            ? url.length
            : queryStrIdx
        : queryStrIdx === -1
            ? hashIdx
            : Math.min(hashIdx, queryStrIdx);
    const slashIdx = url.indexOf('/', endOfProtocol);
    const pathStart = slashIdx === -1 || slashIdx > pathEnd ? pathEnd : slashIdx;
    if (endOfProtocol === pathStart) {
        throw new TypeError('URL must contain a host');
    }
    return url.substring(pathStart, pathEnd);
}
const jsonObjectPreprocess = (val) => {
    if (typeof val === 'string' && val.startsWith('{') && val.endsWith('}')) {
        try {
            return JSON.parse(val);
        }
        catch {
            return val;
        }
    }
    return val;
};
exports.jsonObjectPreprocess = jsonObjectPreprocess;
const numberPreprocess = (val) => {
    if (typeof val === 'string') {
        const number = Number(val);
        if (!Number.isNaN(number))
            return number;
    }
    return val;
};
exports.numberPreprocess = numberPreprocess;
/**
 * Returns true if the two arrays contain the same elements, regardless of order
 * or duplicates.
 */
function arrayEquivalent(a, b) {
    if (a === b)
        return true;
    return a.every(includedIn, b) && b.every(includedIn, a);
}
function includedIn(item) {
    return this.includes(item);
}
function asArray(value) {
    if (value == null)
        return undefined;
    if (Array.isArray(value))
        return value; // already a (possibly readonly) array
    return Array.from(value);
}
const isSpaceSeparatedValue = (value, input) => {
    if (value.length === 0)
        throw new TypeError('Value cannot be empty');
    if (value.includes(' '))
        throw new TypeError('Value cannot contain spaces');
    // Optimized version of:
    // return input.split(' ').includes(value)
    const inputLength = input.length;
    const valueLength = value.length;
    if (inputLength < valueLength)
        return false;
    let idx = input.indexOf(value);
    let idxEnd;
    while (idx !== -1) {
        idxEnd = idx + valueLength;
        if (
        // at beginning or preceded by space
        (idx === 0 || input.charCodeAt(idx - 1) === 32) &&
            // at end or followed by space
            (idxEnd === inputLength || input.charCodeAt(idxEnd) === 32)) {
            return true;
        }
        idx = input.indexOf(value, idxEnd + 1);
    }
    return false;
};
exports.isSpaceSeparatedValue = isSpaceSeparatedValue;
//# sourceMappingURL=util.js.map