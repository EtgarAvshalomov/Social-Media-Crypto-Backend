"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildAtprotoLoopbackClientId = buildAtprotoLoopbackClientId;
exports.parseAtprotoLoopbackClientId = parseAtprotoLoopbackClientId;
const atproto_loopback_client_redirect_uris_js_1 = require("./atproto-loopback-client-redirect-uris.js");
const atproto_oauth_scope_js_1 = require("./atproto-oauth-scope.js");
const oauth_client_id_loopback_js_1 = require("./oauth-client-id-loopback.js");
const oauth_redirect_uri_js_1 = require("./oauth-redirect-uri.js");
const util_js_1 = require("./util.js");
function buildAtprotoLoopbackClientId(config) {
    if (config) {
        const params = new URLSearchParams();
        const { scope } = config;
        if (scope != null && scope !== atproto_oauth_scope_js_1.DEFAULT_ATPROTO_OAUTH_SCOPE) {
            params.set('scope', (0, atproto_oauth_scope_js_1.asAtprotoOAuthScope)(scope));
        }
        const redirectUris = (0, util_js_1.asArray)(config.redirect_uris);
        if (redirectUris &&
            !(0, util_js_1.arrayEquivalent)(redirectUris, atproto_loopback_client_redirect_uris_js_1.DEFAULT_LOOPBACK_CLIENT_REDIRECT_URIS)) {
            if (!redirectUris.length) {
                throw new TypeError(`Unexpected empty "redirect_uris" config`);
            }
            for (const uri of redirectUris) {
                params.append('redirect_uri', oauth_redirect_uri_js_1.oauthLoopbackClientRedirectUriSchema.parse(uri));
            }
        }
        if (params.size) {
            return `${oauth_client_id_loopback_js_1.LOOPBACK_CLIENT_ID_ORIGIN}?${params.toString()}`;
        }
    }
    return oauth_client_id_loopback_js_1.LOOPBACK_CLIENT_ID_ORIGIN;
}
function parseAtprotoLoopbackClientId(clientId) {
    const { scope = atproto_oauth_scope_js_1.DEFAULT_ATPROTO_OAUTH_SCOPE, redirect_uris } = (0, oauth_client_id_loopback_js_1.parseOAuthLoopbackClientId)(clientId);
    if (!(0, atproto_oauth_scope_js_1.isAtprotoOAuthScope)(scope)) {
        throw new TypeError('ATProto Loopback ClientID must include "atproto" scope');
    }
    return {
        scope,
        redirect_uris: redirect_uris ?? [...atproto_loopback_client_redirect_uris_js_1.DEFAULT_LOOPBACK_CLIENT_REDIRECT_URIS],
    };
}
//# sourceMappingURL=atproto-loopback-client-id.js.map