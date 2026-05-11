"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oauthClientIdLoopbackSchema = exports.LOOPBACK_CLIENT_ID_ORIGIN = void 0;
exports.assertOAuthLoopbackClientId = assertOAuthLoopbackClientId;
exports.isOAuthClientIdLoopback = isOAuthClientIdLoopback;
exports.asOAuthClientIdLoopback = asOAuthClientIdLoopback;
exports.parseOAuthLoopbackClientId = parseOAuthLoopbackClientId;
exports.safeParseOAuthLoopbackClientId = safeParseOAuthLoopbackClientId;
exports.safeParseOAuthLoopbackClientIdQueryString = safeParseOAuthLoopbackClientIdQueryString;
const oauth_client_id_js_1 = require("./oauth-client-id.js");
const oauth_redirect_uri_js_1 = require("./oauth-redirect-uri.js");
const oauth_scope_js_1 = require("./oauth-scope.js");
exports.LOOPBACK_CLIENT_ID_ORIGIN = 'http://localhost';
exports.oauthClientIdLoopbackSchema = oauth_client_id_js_1.oauthClientIdSchema.superRefine((input, ctx) => {
    const result = safeParseOAuthLoopbackClientId(input);
    if (!result.success) {
        ctx.addIssue({ code: 'custom', message: result.message });
    }
    return result.success;
});
function assertOAuthLoopbackClientId(input) {
    void parseOAuthLoopbackClientId(input);
}
function isOAuthClientIdLoopback(input) {
    return safeParseOAuthLoopbackClientId(input).success;
}
function asOAuthClientIdLoopback(input) {
    assertOAuthLoopbackClientId(input);
    return input;
}
function parseOAuthLoopbackClientId(input) {
    const result = safeParseOAuthLoopbackClientId(input);
    if (result.success)
        return result.value;
    throw new TypeError(`Invalid loopback client ID: ${result.message}`);
}
function safeParseOAuthLoopbackClientId(input) {
    // @NOTE Not using "new URL" to ensure input indeed matches the type
    // OAuthClientIdLoopback
    if (!input.startsWith(exports.LOOPBACK_CLIENT_ID_ORIGIN)) {
        return {
            success: false,
            message: `Value must start with "${exports.LOOPBACK_CLIENT_ID_ORIGIN}"`,
        };
    }
    if (input.includes('#', exports.LOOPBACK_CLIENT_ID_ORIGIN.length)) {
        return {
            success: false,
            message: 'Value must not contain a hash component',
        };
    }
    // Since we don't allow a path component (except for a single "/") the query
    // string starts after the origin (+ 1 if there is a "/")
    const queryStringIdx = input.length > exports.LOOPBACK_CLIENT_ID_ORIGIN.length &&
        input.charCodeAt(exports.LOOPBACK_CLIENT_ID_ORIGIN.length) === 0x2f /* '/' */
        ? exports.LOOPBACK_CLIENT_ID_ORIGIN.length + 1
        : exports.LOOPBACK_CLIENT_ID_ORIGIN.length;
    // Since we determined the position of the query string based on the origin
    // length (instead of looking for a "?"), we need to make sure the query
    // string position (if any) indeed starts with a "?".
    if (input.length !== queryStringIdx &&
        input.charCodeAt(queryStringIdx) !== 0x3f /* '?' */) {
        return {
            success: false,
            message: 'Value must not contain a path component',
        };
    }
    const queryString = input.slice(queryStringIdx + 1);
    return safeParseOAuthLoopbackClientIdQueryString(queryString);
}
function safeParseOAuthLoopbackClientIdQueryString(input) {
    // Parse query params
    const params = {};
    const it = typeof input === 'string' ? new URLSearchParams(input) : input;
    for (const [key, value] of it) {
        if (key === 'scope') {
            if ('scope' in params) {
                return {
                    success: false,
                    message: 'Duplicate "scope" query parameter',
                };
            }
            const res = oauth_scope_js_1.oauthScopeSchema.safeParse(value);
            if (!res.success) {
                const reason = res.error.issues.map((i) => i.message).join(', ');
                return {
                    success: false,
                    message: `Invalid "scope" query parameter: ${reason || 'Validation failed'}`,
                };
            }
            params.scope = res.data;
        }
        else if (key === 'redirect_uri') {
            const res = oauth_redirect_uri_js_1.oauthLoopbackClientRedirectUriSchema.safeParse(value);
            if (!res.success) {
                const reason = res.error.issues.map((i) => i.message).join(', ');
                return {
                    success: false,
                    message: `Invalid "redirect_uri" query parameter: ${reason || 'Validation failed'}`,
                };
            }
            if (params.redirect_uris == null)
                params.redirect_uris = [res.data];
            else
                params.redirect_uris.push(res.data);
        }
        else {
            return {
                success: false,
                message: `Unexpected query parameter "${key}"`,
            };
        }
    }
    return {
        success: true,
        value: params,
    };
}
//# sourceMappingURL=oauth-client-id-loopback.js.map