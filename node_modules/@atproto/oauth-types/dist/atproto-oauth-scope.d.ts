import { z } from 'zod';
import { OAuthScope } from './oauth-scope.js';
import { SpaceSeparatedValue } from './util.js';
export declare const ATPROTO_SCOPE_VALUE = "atproto";
export type AtprotoScopeValue = typeof ATPROTO_SCOPE_VALUE;
export type AtprotoOAuthScope = OAuthScope & SpaceSeparatedValue<AtprotoScopeValue>;
export declare function isAtprotoOAuthScope(input: string): input is AtprotoOAuthScope;
export declare function asAtprotoOAuthScope<I extends string>(input: I): (I & "atproto") | (I & `atproto ${string}`) | (I & `${string} atproto`) | (I & `${string} atproto ${string}`);
export declare function assertAtprotoOAuthScope(input: string): asserts input is AtprotoOAuthScope;
export declare const atprotoOAuthScopeSchema: z.ZodEffects<z.ZodString, AtprotoOAuthScope, string>;
export declare const DEFAULT_ATPROTO_OAUTH_SCOPE = "atproto";
//# sourceMappingURL=atproto-oauth-scope.d.ts.map