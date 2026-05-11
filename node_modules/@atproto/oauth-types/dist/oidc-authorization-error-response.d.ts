import { z } from 'zod';
/**
 * @see {@link https://openid.net/specs/openid-connect-core-1_0.html#AuthError}
 */
export declare const oidcAuthorizationResponseErrorSchema: z.ZodEnum<["interaction_required", "login_required", "account_selection_required", "consent_required", "invalid_request_uri", "invalid_request_object", "request_not_supported", "request_uri_not_supported", "registration_not_supported"]>;
export type OidcAuthorizationResponseError = z.infer<typeof oidcAuthorizationResponseErrorSchema>;
//# sourceMappingURL=oidc-authorization-error-response.d.ts.map