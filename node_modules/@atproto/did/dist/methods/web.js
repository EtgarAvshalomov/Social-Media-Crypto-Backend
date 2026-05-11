"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DID_WEB_PREFIX = void 0;
exports.isDidWeb = isDidWeb;
exports.asDidWeb = asDidWeb;
exports.assertDidWeb = assertDidWeb;
exports.didWebToUrl = didWebToUrl;
exports.urlToDidWeb = urlToDidWeb;
exports.buildDidWebUrl = buildDidWebUrl;
const did_error_js_1 = require("../did-error.js");
const did_js_1 = require("../did.js");
const uri_js_1 = require("../lib/uri.js");
exports.DID_WEB_PREFIX = `did:web:`;
/**
 * This function checks if the input is a valid Web DID, as per DID spec.
 */
function isDidWeb(input) {
    // Optimization: make cheap checks first
    if (typeof input !== 'string')
        return false;
    if (!input.startsWith(exports.DID_WEB_PREFIX))
        return false;
    if (input.charAt(exports.DID_WEB_PREFIX.length) === ':')
        return false;
    try {
        (0, did_js_1.assertDidMsid)(input, exports.DID_WEB_PREFIX.length);
    }
    catch {
        return false;
    }
    return (0, uri_js_1.canParse)(buildDidWebUrl(input));
}
function asDidWeb(input) {
    assertDidWeb(input);
    return input;
}
function assertDidWeb(input) {
    if (typeof input !== 'string') {
        throw new did_error_js_1.InvalidDidError(typeof input, `DID must be a string`);
    }
    if (!input.startsWith(exports.DID_WEB_PREFIX)) {
        throw new did_error_js_1.InvalidDidError(input, `Invalid did:web prefix`);
    }
    if (input.charAt(exports.DID_WEB_PREFIX.length) === ':') {
        throw new did_error_js_1.InvalidDidError(input, 'did:web MSID must not start with a colon');
    }
    // Make sure every char is valid (per DID spec)
    (0, did_js_1.assertDidMsid)(input, exports.DID_WEB_PREFIX.length);
    if (!(0, uri_js_1.canParse)(buildDidWebUrl(input))) {
        throw new did_error_js_1.InvalidDidError(input, 'Invalid Web DID');
    }
}
function didWebToUrl(did) {
    try {
        return new URL(buildDidWebUrl(did));
    }
    catch (cause) {
        throw new did_error_js_1.InvalidDidError(did, 'Invalid Web DID', cause);
    }
}
function urlToDidWeb(url) {
    const port = url.port ? `%3A${url.port}` : '';
    const path = url.pathname === '/' ? '' : url.pathname.replaceAll('/', ':');
    return `did:web:${url.hostname}${port}${path}`;
}
function buildDidWebUrl(did) {
    const hostIdx = exports.DID_WEB_PREFIX.length;
    const pathIdx = did.indexOf(':', hostIdx);
    const hostEnc = pathIdx === -1 ? did.slice(hostIdx) : did.slice(hostIdx, pathIdx);
    const host = hostEnc.replaceAll('%3A', ':');
    const path = pathIdx === -1 ? '' : did.slice(pathIdx).replaceAll(':', '/');
    const proto = host.startsWith('localhost') &&
        (host.length === 9 || host.charCodeAt(9) === 58) /* ':' */
        ? 'http'
        : 'https';
    return `${proto}://${host}${path}`;
}
//# sourceMappingURL=web.js.map