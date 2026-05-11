"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oauthAuthorizationServerMetadataValidator = exports.oauthAuthorizationServerMetadataSchema = void 0;
const zod_1 = require("zod");
const oauth_code_challenge_method_js_1 = require("./oauth-code-challenge-method.js");
const oauth_issuer_identifier_js_1 = require("./oauth-issuer-identifier.js");
const oauth_prompt_mode_js_1 = require("./oauth-prompt-mode.js");
const uri_js_1 = require("./uri.js");
/**
 * @see {@link https://datatracker.ietf.org/doc/html/rfc8414}
 * @note we do not enforce https: scheme in URIs to support development
 * environments. Make sure to validate the URIs before using it in a production
 * environment.
 */
exports.oauthAuthorizationServerMetadataSchema = zod_1.z.object({
    issuer: oauth_issuer_identifier_js_1.oauthIssuerIdentifierSchema,
    claims_supported: zod_1.z.array(zod_1.z.string()).optional(),
    claims_locales_supported: zod_1.z.array(zod_1.z.string()).optional(),
    claims_parameter_supported: zod_1.z.boolean().optional(),
    request_parameter_supported: zod_1.z.boolean().optional(),
    request_uri_parameter_supported: zod_1.z.boolean().optional(),
    require_request_uri_registration: zod_1.z.boolean().optional(),
    scopes_supported: zod_1.z.array(zod_1.z.string()).optional(),
    subject_types_supported: zod_1.z.array(zod_1.z.string()).optional(),
    response_types_supported: zod_1.z.array(zod_1.z.string()).optional(),
    response_modes_supported: zod_1.z.array(zod_1.z.string()).optional(),
    grant_types_supported: zod_1.z.array(zod_1.z.string()).optional(),
    code_challenge_methods_supported: zod_1.z
        .array(oauth_code_challenge_method_js_1.oauthCodeChallengeMethodSchema)
        .min(1)
        .optional(),
    ui_locales_supported: zod_1.z.array(zod_1.z.string()).optional(),
    id_token_signing_alg_values_supported: zod_1.z.array(zod_1.z.string()).optional(),
    display_values_supported: zod_1.z.array(zod_1.z.string()).optional(),
    request_object_signing_alg_values_supported: zod_1.z.array(zod_1.z.string()).optional(),
    authorization_response_iss_parameter_supported: zod_1.z.boolean().optional(),
    authorization_details_types_supported: zod_1.z.array(zod_1.z.string()).optional(),
    request_object_encryption_alg_values_supported: zod_1.z
        .array(zod_1.z.string())
        .optional(),
    request_object_encryption_enc_values_supported: zod_1.z
        .array(zod_1.z.string())
        .optional(),
    jwks_uri: uri_js_1.webUriSchema.optional(),
    authorization_endpoint: uri_js_1.webUriSchema, // .optional(),
    token_endpoint: uri_js_1.webUriSchema, // .optional(),
    // https://www.rfc-editor.org/rfc/rfc8414.html#section-2
    token_endpoint_auth_methods_supported: zod_1.z
        .array(zod_1.z.string())
        // > If omitted, the default is "client_secret_basic" [...].
        .default(['client_secret_basic']),
    token_endpoint_auth_signing_alg_values_supported: zod_1.z
        .array(zod_1.z.string())
        .optional(),
    revocation_endpoint: uri_js_1.webUriSchema.optional(),
    introspection_endpoint: uri_js_1.webUriSchema.optional(),
    pushed_authorization_request_endpoint: uri_js_1.webUriSchema.optional(),
    require_pushed_authorization_requests: zod_1.z.boolean().optional(),
    userinfo_endpoint: uri_js_1.webUriSchema.optional(),
    end_session_endpoint: uri_js_1.webUriSchema.optional(),
    registration_endpoint: uri_js_1.webUriSchema.optional(),
    // https://datatracker.ietf.org/doc/html/rfc9449#section-5.1
    dpop_signing_alg_values_supported: zod_1.z.array(zod_1.z.string()).optional(),
    // https://www.rfc-editor.org/rfc/rfc9728.html#section-4
    protected_resources: zod_1.z.array(uri_js_1.webUriSchema).optional(),
    // https://www.ietf.org/archive/id/draft-ietf-oauth-client-id-metadata-document-00.html
    client_id_metadata_document_supported: zod_1.z.boolean().optional(),
    // https://openid.net/specs/openid-connect-prompt-create-1_0.html#section-4.2
    prompt_values_supported: zod_1.z.array(oauth_prompt_mode_js_1.oauthPromptModeSchema).optional(),
});
exports.oauthAuthorizationServerMetadataValidator = exports.oauthAuthorizationServerMetadataSchema
    .superRefine((data, ctx) => {
    if (data.require_pushed_authorization_requests &&
        !data.pushed_authorization_request_endpoint) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            message: '"pushed_authorization_request_endpoint" required when "require_pushed_authorization_requests" is true',
        });
    }
})
    .superRefine((data, ctx) => {
    if (data.response_types_supported) {
        if (!data.response_types_supported.includes('code')) {
            ctx.addIssue({
                code: zod_1.z.ZodIssueCode.custom,
                message: 'Response type "code" is required',
            });
        }
    }
})
    .superRefine((data, ctx) => {
    if (data.token_endpoint_auth_signing_alg_values_supported?.includes('none')) {
        // https://openid.net/specs/openid-connect-discovery-1_0.html#rfc.section.3
        // > The value `none` MUST NOT be used.
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            message: 'Client authentication method "none" is not allowed',
        });
    }
});
//# sourceMappingURL=oauth-authorization-server-metadata.js.map