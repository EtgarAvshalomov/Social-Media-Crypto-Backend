"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isResolvedHandle = isResolvedHandle;
exports.asResolvedHandle = asResolvedHandle;
const did_1 = require("@atproto/did");
/**
 * @see {@link https://atproto.com/specs/did#blessed-did-methods}
 */
function isResolvedHandle(value) {
    return value === null || (0, did_1.isAtprotoDid)(value);
}
function asResolvedHandle(value) {
    return isResolvedHandle(value) ? value : null;
}
//# sourceMappingURL=types.js.map