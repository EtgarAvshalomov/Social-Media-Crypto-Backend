import { TypeOf, z } from 'zod';
/**
 * This is a {@link loopbackUriSchema} with the additional restriction that
 * the hostname `localhost` is not allowed.
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc8252#section-8.3 Loopback Redirect Considerations} RFC8252
 *
 * > While redirect URIs using localhost (i.e.,
 * > "http://localhost:{port}/{path}") function similarly to loopback IP
 * > redirects described in Section 7.3, the use of localhost is NOT
 * > RECOMMENDED. Specifying a redirect URI with the loopback IP literal rather
 * > than localhost avoids inadvertently listening on network interfaces other
 * > than the loopback interface.  It is also less susceptible to client-side
 * > firewalls and misconfigured host name resolution on the user's device.
 */
export declare const loopbackRedirectURISchema: z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodString, `${string}:${string}`, string>, `http://[::1]${string}` | "http://localhost" | `http://localhost#${string}` | `http://localhost?${string}` | `http://localhost/${string}` | `http://localhost:${string}` | "http://127.0.0.1" | `http://127.0.0.1#${string}` | `http://127.0.0.1?${string}` | `http://127.0.0.1/${string}` | `http://127.0.0.1:${string}`, string>, `http://[::1]${string}` | "http://127.0.0.1" | `http://127.0.0.1#${string}` | `http://127.0.0.1?${string}` | `http://127.0.0.1/${string}` | `http://127.0.0.1:${string}`, string>;
export type LoopbackRedirectURI = TypeOf<typeof loopbackRedirectURISchema>;
export declare const oauthLoopbackClientRedirectUriSchema: z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodString, `${string}:${string}`, string>, `http://[::1]${string}` | "http://localhost" | `http://localhost#${string}` | `http://localhost?${string}` | `http://localhost/${string}` | `http://localhost:${string}` | "http://127.0.0.1" | `http://127.0.0.1#${string}` | `http://127.0.0.1?${string}` | `http://127.0.0.1/${string}` | `http://127.0.0.1:${string}`, string>, `http://[::1]${string}` | "http://127.0.0.1" | `http://127.0.0.1#${string}` | `http://127.0.0.1?${string}` | `http://127.0.0.1/${string}` | `http://127.0.0.1:${string}`, string>;
export type OAuthLoopbackRedirectURI = TypeOf<typeof oauthLoopbackClientRedirectUriSchema>;
export declare const oauthRedirectUriSchema: z.ZodEffects<z.ZodString, `http://[::1]${string}` | "http://127.0.0.1" | `http://127.0.0.1#${string}` | `http://127.0.0.1?${string}` | `http://127.0.0.1/${string}` | `http://127.0.0.1:${string}` | `https://${string}` | `${string}.${string}:/${string}`, string>;
export type OAuthRedirectUri = TypeOf<typeof oauthRedirectUriSchema>;
//# sourceMappingURL=oauth-redirect-uri.d.ts.map