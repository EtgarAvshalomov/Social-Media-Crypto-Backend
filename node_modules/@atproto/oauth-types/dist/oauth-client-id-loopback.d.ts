import { OAuthLoopbackRedirectURI } from './oauth-redirect-uri.js';
import { OAuthScope } from './oauth-scope.js';
export declare const LOOPBACK_CLIENT_ID_ORIGIN = "http://localhost";
export type OAuthClientIdLoopback = `http://localhost${'' | `/`}${'' | `?${string}`}`;
export type OAuthLoopbackClientIdParams = {
    scope?: OAuthScope;
    redirect_uris?: [OAuthLoopbackRedirectURI, ...OAuthLoopbackRedirectURI[]];
};
export declare const oauthClientIdLoopbackSchema: import("zod").ZodEffects<import("zod").ZodString, "http://localhost" | `http://localhost?${string}` | "http://localhost/" | `http://localhost/?${string}`, string>;
export declare function assertOAuthLoopbackClientId(input: string): asserts input is OAuthClientIdLoopback;
export declare function isOAuthClientIdLoopback<T extends string>(input: T): input is T & OAuthClientIdLoopback;
export declare function asOAuthClientIdLoopback<T extends string>(input: T): (T & "http://localhost") | (T & `http://localhost?${string}`) | (T & "http://localhost/") | (T & `http://localhost/?${string}`);
export declare function parseOAuthLoopbackClientId(input: string): OAuthLoopbackClientIdParams;
/**
 * Similar to Zod's {@link SafeParseReturnType} but uses a simple "message"
 * string instead of an "error" Error object.
 */
type LightParseReturnType<T> = {
    success: true;
    value: T;
} | {
    success: false;
    message: string;
};
export declare function safeParseOAuthLoopbackClientId(input: string): LightParseReturnType<OAuthLoopbackClientIdParams>;
export declare function safeParseOAuthLoopbackClientIdQueryString(input: string | Iterable<[key: string, value: string]>): LightParseReturnType<OAuthLoopbackClientIdParams>;
export {};
//# sourceMappingURL=oauth-client-id-loopback.d.ts.map