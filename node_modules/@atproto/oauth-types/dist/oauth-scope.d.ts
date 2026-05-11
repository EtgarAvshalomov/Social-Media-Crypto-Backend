import { z } from 'zod';
export declare const OAUTH_SCOPE_REGEXP: RegExp;
export declare const isOAuthScope: (input: string) => boolean;
/**
 * A (single) space separated list of non empty printable ASCII char string
 * (except backslash and double quote).
 *
 * @see {@link https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1-11#section-1.4.1}
 */
export declare const oauthScopeSchema: z.ZodEffects<z.ZodString, string, string>;
export type OAuthScope = z.infer<typeof oauthScopeSchema>;
//# sourceMappingURL=oauth-scope.d.ts.map