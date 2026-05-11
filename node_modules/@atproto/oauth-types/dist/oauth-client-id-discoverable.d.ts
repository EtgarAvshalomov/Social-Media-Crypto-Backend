import { TypeOf, z } from 'zod';
/**
 * @see {@link https://www.ietf.org/archive/id/draft-ietf-oauth-client-id-metadata-document-00.html}
 */
export declare const oauthClientIdDiscoverableSchema: z.ZodEffects<z.ZodIntersection<z.ZodString, z.ZodEffects<z.ZodEffects<z.ZodString, `${string}:${string}`, string>, `https://${string}`, string>>, `https://${string}/${string}`, string>;
export type OAuthClientIdDiscoverable = TypeOf<typeof oauthClientIdDiscoverableSchema>;
export declare function isOAuthClientIdDiscoverable(clientId: string): clientId is OAuthClientIdDiscoverable;
export declare const conventionalOAuthClientIdSchema: z.ZodEffects<z.ZodEffects<z.ZodIntersection<z.ZodString, z.ZodEffects<z.ZodEffects<z.ZodString, `${string}:${string}`, string>, `https://${string}`, string>>, `https://${string}/${string}`, string>, `https://${string}/oauth-client-metadata.json`, string>;
export type ConventionalOAuthClientId = TypeOf<typeof conventionalOAuthClientIdSchema>;
export declare function isConventionalOAuthClientId(clientId: string): clientId is ConventionalOAuthClientId;
export declare function assertOAuthDiscoverableClientId(value: string): asserts value is OAuthClientIdDiscoverable;
export declare function parseOAuthDiscoverableClientId(clientId: string): URL;
//# sourceMappingURL=oauth-client-id-discoverable.d.ts.map