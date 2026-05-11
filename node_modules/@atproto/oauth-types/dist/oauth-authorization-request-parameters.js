"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oauthAuthorizationRequestParametersSchema = void 0;
const zod_1 = require("zod");
const jwk_1 = require("@atproto/jwk");
const oauth_authorization_details_js_1 = require("./oauth-authorization-details.js");
const oauth_client_id_js_1 = require("./oauth-client-id.js");
const oauth_code_challenge_method_js_1 = require("./oauth-code-challenge-method.js");
const oauth_prompt_mode_js_1 = require("./oauth-prompt-mode.js");
const oauth_redirect_uri_js_1 = require("./oauth-redirect-uri.js");
const oauth_response_mode_js_1 = require("./oauth-response-mode.js");
const oauth_response_type_js_1 = require("./oauth-response-type.js");
const oauth_scope_js_1 = require("./oauth-scope.js");
const oidc_claims_parameter_js_1 = require("./oidc-claims-parameter.js");
const oidc_claims_properties_js_1 = require("./oidc-claims-properties.js");
const oidc_entity_type_js_1 = require("./oidc-entity-type.js");
const util_js_1 = require("./util.js");
/**
 * @note non string parameters will be converted from their string
 * representation since oauth request parameters are typically sent as URL
 * encoded form data or URL encoded query string.
 * @see {@link https://openid.net/specs/openid-connect-core-1_0.html#AuthRequest | OIDC}
 */
exports.oauthAuthorizationRequestParametersSchema = zod_1.z.object({
    client_id: oauth_client_id_js_1.oauthClientIdSchema,
    state: zod_1.z.string().optional(),
    redirect_uri: oauth_redirect_uri_js_1.oauthRedirectUriSchema.optional(),
    scope: oauth_scope_js_1.oauthScopeSchema.optional(),
    response_type: oauth_response_type_js_1.oauthResponseTypeSchema,
    // PKCE
    // https://datatracker.ietf.org/doc/html/rfc7636#section-4.3
    code_challenge: zod_1.z.string().optional(),
    code_challenge_method: oauth_code_challenge_method_js_1.oauthCodeChallengeMethodSchema.optional(),
    // DPOP
    // https://datatracker.ietf.org/doc/html/rfc9449#section-12.3
    dpop_jkt: zod_1.z.string().optional(),
    // OIDC
    // Default depend on response_type
    response_mode: oauth_response_mode_js_1.oauthResponseModeSchema.optional(),
    nonce: zod_1.z.string().optional(),
    // Specifies the allowable elapsed time in seconds since the last time the
    // End-User was actively authenticated by the OP. If the elapsed time is
    // greater than this value, the OP MUST attempt to actively re-authenticate
    // the End-User. (The max_age request parameter corresponds to the OpenID 2.0
    // PAPE [OpenID.PAPE] max_auth_age request parameter.) When max_age is used,
    // the ID Token returned MUST include an auth_time Claim Value. Note that
    // max_age=0 is equivalent to prompt=login.
    max_age: zod_1.z.preprocess(util_js_1.numberPreprocess, zod_1.z.number().int().min(0)).optional(),
    claims: zod_1.z
        .preprocess(util_js_1.jsonObjectPreprocess, zod_1.z.record(oidc_entity_type_js_1.oidcEntityTypeSchema, zod_1.z.record(oidc_claims_parameter_js_1.oidcClaimsParameterSchema, zod_1.z.union([zod_1.z.literal(null), oidc_claims_properties_js_1.oidcClaimsPropertiesSchema]))))
        .optional(),
    // https://openid.net/specs/openid-connect-core-1_0.html#RegistrationParameter
    // Not supported by this library (yet?)
    // registration: clientMetadataSchema.optional(),
    login_hint: zod_1.z.string().min(1).optional(),
    ui_locales: zod_1.z
        .string()
        .regex(/^[a-z]{2,3}(-[A-Z]{2})?( [a-z]{2,3}(-[A-Z]{2})?)*$/) // fr-CA fr en
        .optional(),
    // Previous ID Token, should be provided when prompt=none is used
    id_token_hint: jwk_1.signedJwtSchema.optional(),
    // Type of UI the AS is displayed on
    display: zod_1.z.enum(['page', 'popup', 'touch', 'wap']).optional(),
    // How the AS should prompt the user for authorization:
    prompt: oauth_prompt_mode_js_1.oauthPromptModeSchema.optional(),
    // https://datatracker.ietf.org/doc/html/rfc9396
    authorization_details: zod_1.z
        .preprocess(util_js_1.jsonObjectPreprocess, oauth_authorization_details_js_1.oauthAuthorizationDetailsSchema)
        .optional(),
});
//# sourceMappingURL=oauth-authorization-request-parameters.js.map