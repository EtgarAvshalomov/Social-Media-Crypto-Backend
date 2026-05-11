"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oauthScopeSchema = exports.isOAuthScope = exports.OAUTH_SCOPE_REGEXP = void 0;
const zod_1 = require("zod");
// scope       = scope-token *( SP scope-token )
// scope-token = 1*( %x21 / %x23-5B / %x5D-7E )
exports.OAUTH_SCOPE_REGEXP = /^[\x21\x23-\x5B\x5D-\x7E]+(?: [\x21\x23-\x5B\x5D-\x7E]+)*$/;
const isOAuthScope = (input) => exports.OAUTH_SCOPE_REGEXP.test(input);
exports.isOAuthScope = isOAuthScope;
/**
 * A (single) space separated list of non empty printable ASCII char string
 * (except backslash and double quote).
 *
 * @see {@link https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1-11#section-1.4.1}
 */
exports.oauthScopeSchema = zod_1.z.string().refine(exports.isOAuthScope, {
    message: 'Invalid OAuth scope',
});
//# sourceMappingURL=oauth-scope.js.map