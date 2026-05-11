import { z } from 'zod';
/**
 * @see {@link https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1-12#name-error-response-2}
 */
export declare const oauthAuthorizationResponseErrorSchema: z.ZodEnum<["invalid_request", "unauthorized_client", "access_denied", "unsupported_response_type", "invalid_scope", "server_error", "temporarily_unavailable"]>;
export type OAuthAuthorizationResponseError = z.infer<typeof oauthAuthorizationResponseErrorSchema>;
//# sourceMappingURL=oauth-authorization-response-error.d.ts.map