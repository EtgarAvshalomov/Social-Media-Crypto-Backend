"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractAtprotoHandle = extractAtprotoHandle;
exports.extractNormalizedHandle = extractNormalizedHandle;
exports.asNormalizedHandle = asNormalizedHandle;
exports.normalizeHandle = normalizeHandle;
exports.isValidHandle = isValidHandle;
/**
 * Extract the raw, un-validated, Atproto handle from a DID document.
 */
function extractAtprotoHandle(document) {
    if (document.alsoKnownAs) {
        for (const h of document.alsoKnownAs) {
            if (h.startsWith('at://')) {
                // strip off "at://" prefix
                return h.slice(5);
            }
        }
    }
    return undefined;
}
/**
 * Extracts a validated, normalized Atproto handle from a DID document.
 */
function extractNormalizedHandle(document) {
    const handle = extractAtprotoHandle(document);
    if (!handle)
        return undefined;
    return asNormalizedHandle(handle);
}
function asNormalizedHandle(input) {
    const handle = normalizeHandle(input);
    return isValidHandle(handle) ? handle : undefined;
}
function normalizeHandle(handle) {
    return handle.toLowerCase();
}
function isValidHandle(handle) {
    return (handle.length > 0 &&
        handle.length < 254 &&
        /^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/.test(handle));
}
//# sourceMappingURL=util.js.map