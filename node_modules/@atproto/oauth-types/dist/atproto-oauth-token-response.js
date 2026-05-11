"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.atprotoOAuthTokenResponseSchema = void 0;
const zod_1 = require("zod");
const did_1 = require("@atproto/did");
const atproto_oauth_scope_1 = require("./atproto-oauth-scope");
const oauth_token_response_js_1 = require("./oauth-token-response.js");
exports.atprotoOAuthTokenResponseSchema = oauth_token_response_js_1.oauthTokenResponseSchema.extend({
    token_type: zod_1.z.literal('DPoP'),
    sub: did_1.atprotoDidSchema,
    scope: atproto_oauth_scope_1.atprotoOAuthScopeSchema,
    // OpenID is not compatible with atproto identities
    id_token: zod_1.z.never().optional(),
});
//# sourceMappingURL=atproto-oauth-token-response.js.map