"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ATPROTO_VERIFICATION_METHOD_TYPES = exports.isAtprotoAudience = exports.atprotoDidSchema = void 0;
exports.isAtprotoDid = isAtprotoDid;
exports.asAtprotoDid = asAtprotoDid;
exports.assertAtprotoDid = assertAtprotoDid;
exports.assertAtprotoDidWeb = assertAtprotoDidWeb;
exports.isAtprotoDidWeb = isAtprotoDidWeb;
exports.extractAtprotoData = extractAtprotoData;
exports.extractPdsUrl = extractPdsUrl;
exports.isAtprotoAka = isAtprotoAka;
exports.isAtprotoPersonalDataServerService = isAtprotoPersonalDataServerService;
exports.isAtprotoVerificationMethod = isAtprotoVerificationMethod;
const zod_1 = require("zod");
const did_error_js_1 = require("./did-error.js");
const uri_js_1 = require("./lib/uri.js");
const methods_js_1 = require("./methods.js");
const utils_js_1 = require("./utils.js");
exports.atprotoDidSchema = zod_1.z
    .string()
    .refine(isAtprotoDid, `Atproto only allows "plc" and "web" DID methods`);
function isAtprotoDid(input) {
    return (0, methods_js_1.isDidPlc)(input) || isAtprotoDidWeb(input);
}
function asAtprotoDid(input) {
    assertAtprotoDid(input);
    return input;
}
function assertAtprotoDid(input) {
    if (typeof input !== 'string') {
        throw new did_error_js_1.InvalidDidError(typeof input, `DID must be a string`);
    }
    else if (input.startsWith(methods_js_1.DID_PLC_PREFIX)) {
        (0, methods_js_1.assertDidPlc)(input);
    }
    else if (input.startsWith(methods_js_1.DID_WEB_PREFIX)) {
        assertAtprotoDidWeb(input);
    }
    else {
        throw new did_error_js_1.InvalidDidError(input, `Atproto only allows "plc" and "web" DID methods`);
    }
}
function assertAtprotoDidWeb(input) {
    (0, methods_js_1.assertDidWeb)(input);
    if (isDidWebWithPath(input)) {
        throw new did_error_js_1.InvalidDidError(input, `Atproto does not allow path components in Web DIDs`);
    }
    if (isDidWebWithHttpsPort(input)) {
        throw new did_error_js_1.InvalidDidError(input, `Atproto does not allow port numbers in Web DIDs, except for localhost`);
    }
}
/**
 * @see {@link https://atproto.com/specs/did#blessed-did-methods}
 */
function isAtprotoDidWeb(input) {
    if (!(0, methods_js_1.isDidWeb)(input)) {
        return false;
    }
    if (isDidWebWithPath(input)) {
        return false;
    }
    if (isDidWebWithHttpsPort(input)) {
        return false;
    }
    return true;
}
function isDidWebWithPath(did) {
    return did.includes(':', methods_js_1.DID_WEB_PREFIX.length);
}
function isLocalhostDid(did) {
    return (did === 'did:web:localhost' ||
        did.startsWith('did:web:localhost:') ||
        did.startsWith('did:web:localhost%3A'));
}
function isDidWebWithHttpsPort(did) {
    if (isLocalhostDid(did))
        return false;
    const pathIdx = did.indexOf(':', methods_js_1.DID_WEB_PREFIX.length);
    const hasPort = pathIdx === -1
        ? // No path component, check if there's a port separator anywhere after
            // the "did:web:" prefix
            did.includes('%3A', methods_js_1.DID_WEB_PREFIX.length)
        : // There is a path component; if there is an encoded colon *before* it,
            // then there is a port number
            did.lastIndexOf('%3A', pathIdx) !== -1;
    return hasPort;
}
const isAtprotoAudience = (value) => {
    if (typeof value !== 'string')
        return false;
    const hashIndex = value.indexOf('#');
    if (hashIndex === -1)
        return false;
    if (value.indexOf('#', hashIndex + 1) !== -1)
        return false;
    return ((0, uri_js_1.isFragment)(value, hashIndex + 1) && isAtprotoDid(value.slice(0, hashIndex)));
};
exports.isAtprotoAudience = isAtprotoAudience;
function extractAtprotoData(document) {
    return {
        did: document.id,
        aka: document.alsoKnownAs?.find(isAtprotoAka)?.slice(5),
        key: document.verificationMethod?.find((isAtprotoVerificationMethod), document),
        pds: document.service?.find((isAtprotoPersonalDataServerService), document),
    };
}
function extractPdsUrl(document) {
    const service = document.service?.find(isAtprotoPersonalDataServerService, document);
    if (!service) {
        throw new did_error_js_1.DidError(document.id, `Document ${document.id} does not contain a (valid) #atproto_pds service URL`, 'did-service-not-found');
    }
    return new URL(service.serviceEndpoint);
}
function isAtprotoAka(value) {
    return value.startsWith('at://');
}
function isAtprotoPersonalDataServerService(service) {
    return (service?.type === 'AtprotoPersonalDataServer' &&
        typeof service.serviceEndpoint === 'string' &&
        (0, uri_js_1.canParse)(service.serviceEndpoint) &&
        (0, utils_js_1.matchesIdentifier)(this.id, 'atproto_pds', service.id));
}
exports.ATPROTO_VERIFICATION_METHOD_TYPES = Object.freeze([
    'EcdsaSecp256r1VerificationKey2019',
    'EcdsaSecp256k1VerificationKey2019',
    'Multikey',
]);
function isAtprotoVerificationMethod(method) {
    return (typeof method === 'object' &&
        typeof method?.publicKeyMultibase === 'string' &&
        exports.ATPROTO_VERIFICATION_METHOD_TYPES.includes(method.type) &&
        (0, utils_js_1.matchesIdentifier)(this.id, 'atproto', method.id));
}
//# sourceMappingURL=atproto.js.map