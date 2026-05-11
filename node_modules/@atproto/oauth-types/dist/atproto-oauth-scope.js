"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_ATPROTO_OAUTH_SCOPE = exports.atprotoOAuthScopeSchema = exports.ATPROTO_SCOPE_VALUE = void 0;
exports.isAtprotoOAuthScope = isAtprotoOAuthScope;
exports.asAtprotoOAuthScope = asAtprotoOAuthScope;
exports.assertAtprotoOAuthScope = assertAtprotoOAuthScope;
const zod_1 = require("zod");
const oauth_scope_js_1 = require("./oauth-scope.js");
const util_js_1 = require("./util.js");
exports.ATPROTO_SCOPE_VALUE = 'atproto';
function isAtprotoOAuthScope(input) {
    return ((0, oauth_scope_js_1.isOAuthScope)(input) && (0, util_js_1.isSpaceSeparatedValue)(exports.ATPROTO_SCOPE_VALUE, input));
}
function asAtprotoOAuthScope(input) {
    if (isAtprotoOAuthScope(input))
        return input;
    throw new TypeError(`Value must contain "${exports.ATPROTO_SCOPE_VALUE}" scope value`);
}
function assertAtprotoOAuthScope(input) {
    void asAtprotoOAuthScope(input);
}
exports.atprotoOAuthScopeSchema = zod_1.z.string().refine(isAtprotoOAuthScope, {
    message: 'Invalid ATProto OAuth scope',
});
// Default scope is for reading identity (did) only
exports.DEFAULT_ATPROTO_OAUTH_SCOPE = exports.ATPROTO_SCOPE_VALUE;
//# sourceMappingURL=atproto-oauth-scope.js.map