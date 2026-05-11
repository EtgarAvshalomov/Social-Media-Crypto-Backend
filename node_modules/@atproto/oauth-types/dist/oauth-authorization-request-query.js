"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oauthAuthorizationRequestQuerySchema = void 0;
const zod_1 = require("zod");
const oauth_authorization_request_jar_js_1 = require("./oauth-authorization-request-jar.js");
const oauth_authorization_request_parameters_js_1 = require("./oauth-authorization-request-parameters.js");
const oauth_authorization_request_uri_js_1 = require("./oauth-authorization-request-uri.js");
const oauth_client_id_js_1 = require("./oauth-client-id.js");
exports.oauthAuthorizationRequestQuerySchema = zod_1.z.intersection(zod_1.z.object({
    // REQUIRED. OAuth 2.0 [RFC6749] client_id.
    client_id: oauth_client_id_js_1.oauthClientIdSchema,
}), zod_1.z.union([
    oauth_authorization_request_parameters_js_1.oauthAuthorizationRequestParametersSchema,
    oauth_authorization_request_jar_js_1.oauthAuthorizationRequestJarSchema,
    oauth_authorization_request_uri_js_1.oauthAuthorizationRequestUriSchema,
]));
//# sourceMappingURL=oauth-authorization-request-query.js.map